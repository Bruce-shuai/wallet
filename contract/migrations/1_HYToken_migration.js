const HYToken = artifacts.require("HYToken");
console.log(HYToken);
module.exports = function (deployer) {
  deployer.deploy(HYToken, 'hy', 'HY', 18, '1024000000000000000000');
}