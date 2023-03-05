const HYToken = artifacts.require("HYToken");
const Faucet = artifacts.require("Faucet");

module.exports = function (deployer) {
  deployer.deploy(HYToken, 'hy', 'HY', 18, '1024000000000000000000').then(function () {
    return deployer.deploy(Faucet, HYToken.address, 1);
  });
}