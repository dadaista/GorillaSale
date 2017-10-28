//var ConvertLib = artifacts.require("./ConvertLib.sol");
//var MetaCoin = artifacts.require("./MetaCoin.sol");
var Sale = artifacts.require("./GorillaSale.sol");
var Token = artifacts.require("./GorillaToken.sol");
var Hello = artifacts.require("./Hello.sol");

module.exports = function(deployer) {
//  deployer.deploy(ConvertLib);
//  deployer.link(ConvertLib, MetaCoin);
//  deployer.deploy(MetaCoin);

  const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1 // one second in the future
  const endTime = startTime + 180//(86400 * 20) // 20 days
  const rate = new web3.BigNumber(1000)
  const goal = new web3.BigNumber(200)
  const cap = new web3.BigNumber(20000)
  const wallet = web3.eth.accounts[0]


    deployer.deploy(Token, {gas:1e6});
    deployer.deploy(Sale,startTime, endTime, rate, goal, cap, wallet,{gas:6030000});

    
    deployer.deploy(Hello);
};
