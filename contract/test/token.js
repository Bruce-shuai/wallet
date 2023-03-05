const HYToken = artifacts.require("HYToken");

contract("Token", (accounts) => {
  const [alice, bob] = accounts;

  it("balanceOf", async () => {
    // 发 HY 币，发行 1024 个
    const hyTokenInstance = await HYToken.new('hy', 'HY', 0, '1024', { from: alice });
    // 查看 alice 的余额是否是 1024
    const result = await hyTokenInstance.balanceOf(alice);
    assert.equal(result.valueOf().words[0], 1024, "1024 wasn't in alice");
  });

  it("transfer", async () => {
    // 发 HY 币，发行 1024 个
    const hyTokenInstance = await HYToken.new('hy', 'HY', 0, '1024', { from: alice });
    // alice 将 1 个 HY 币转给 bob
    await hyTokenInstance.transfer(bob, 1, { from: alice });
    // 查看 alice 的余额是否是 1023
    let aliceBalanceResult = await hyTokenInstance.balanceOf(alice);
    assert.equal(aliceBalanceResult.valueOf().words[0], 1023, "1023 wasn't in alice");
    // 查看 bob 的余额是否是 1
    let bobBalanceResult = await hyTokenInstance.balanceOf(bob);
    assert.equal(bobBalanceResult.valueOf().words[0], 1, "1 wasn't in bob");

    // bob 将 1 个 HY 币转给 alice
    await hyTokenInstance.transfer(alice, 1, { from: bob });
    // 查看 alice 的余额是否是 1024
    aliceBalanceResult = await hyTokenInstance.balanceOf(alice);
    assert.equal(aliceBalanceResult.valueOf().words[0], 1024, "1024 wasn't in alice");
    // 查看 bob 的余额是否是 0
    bobBalanceResult = await hyTokenInstance.balanceOf(bob);
    assert.equal(bobBalanceResult.valueOf().words[0], 0, "0 wasn't in bob");
  });
});