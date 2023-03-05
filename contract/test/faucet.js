const HYToken = artifacts.require("HYToken");
const Faucet = artifacts.require("Faucet");

contract("Faucet", (accounts) => {
  const [alice, bob] = accounts;

  it("withdraw", async () => {
    // 发 HY 币，发行 100 个
    const HYTokenInstance = await HYToken.new('hy', 'HY', 0, '1024', { from: alice });
    // 发水龙头，每次发 1 个
    const faucetInstance = await Faucet.new(HYTokenInstance.address, 1, { from: alice });
    // 把 100 个 HY 币转给水龙头
    await HYTokenInstance.transfer(faucetInstance.address, 100, { from: alice });
    // 查看水龙头的余额
    const res = await HYTokenInstance.balanceOf(faucetInstance.address, { from: alice });
    assert.equal(res.words[0], 100, "水龙头的余额不是 100");
    // bob 从水龙头取币
    await faucetInstance.withdraw({ from: bob });
    try {
      // bob 重复从水龙头取币
      await faucetInstance.withdraw({ from: bob });
    } catch (e) {
      // 重复取币会报错
      assert.include(e.message, 'You can only request tokens once every 24 hours', 'bob 不能重复取币')
    }
    // 查看水龙头的余额
    const res2 = await HYTokenInstance.balanceOf(faucetInstance.address, { from: alice });
    assert.equal(res2.words[0], 99, "水龙头的余额不是 99");
    // 查看 bob 的余额
    const res3 = await HYTokenInstance.balanceOf(bob, { from: alice });
    assert.equal(res3.words[0], 1, "bob 的余额不是 1");
  });
});
