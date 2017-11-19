//var ConvertLib = artifacts.require("./ConvertLib.sol");
//var MetaCoin = artifacts.require("./MetaCoin.sol");
//var Sale = artifacts.require("./GorillaSale.sol");
var OranguSale = artifacts.require("./OranguSale.sol");
//var Token = artifacts.require("./GorillaToken.sol");
//var Hello = artifacts.require("./Hello.sol");

module.exports = function(deployer,network,accounts) {
//  deployer.deploy(ConvertLib);
//  deployer.link(ConvertLib, MetaCoin);
//  deployer.deploy(MetaCoin);


  const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 120; // 2m  in the future


  console.log("starttime is:"+startTime);
  const endTime = startTime + (86400 * 365); // 365 days
  console.log("endTime is:"+endTime);

  const maxrate = 6;
  const rate = 4;
  const minrate = 2;

  const wallet = accounts[0];


 
//  deployer.deploy(Sale, new web3.BigNumber(startTime), 
//                        new web3.BigNumber(endTime), 
//                        new web3.BigNumber(rate), 
//                        wallet);

  const preminedOwner = accounts[0];
  const cap = 100000 * 10**18;//100keth
  const premined = 1000 * 10**15// 1k tokens are premined
  deployer.deploy(OranguSale, new web3.BigNumber(startTime), 
                              new web3.BigNumber(endTime), 
                              new web3.BigNumber(rate), 
                              new web3.BigNumber(maxrate), 
                              new web3.BigNumber(minrate), 
                              wallet,
                              preminedOwner,
                              cap,
                              premined);

    
  //deployer.deploy(Hello);
};
