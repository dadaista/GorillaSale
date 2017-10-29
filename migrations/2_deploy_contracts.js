//var ConvertLib = artifacts.require("./ConvertLib.sol");
//var MetaCoin = artifacts.require("./MetaCoin.sol");
var Sale = artifacts.require("./GorillaSale.sol");
//var Token = artifacts.require("./GorillaToken.sol");
//var Hello = artifacts.require("./Hello.sol");

module.exports = function(deployer,network,accounts) {
//  deployer.deploy(ConvertLib);
//  deployer.link(ConvertLib, MetaCoin);
//  deployer.deploy(MetaCoin);


  const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1 // one second in the future
  const endTime = startTime + (86400 * 20) // 20 days
  const rate = new web3.BigNumber(1000)
  const wallet = accounts[0]


  //deployer.deploy(Token, {gas:1e6});
  deployer.deploy(Sale, startTime, endTime, rate, wallet,{gas:6030000});

    
  //deployer.deploy(Hello);
};
