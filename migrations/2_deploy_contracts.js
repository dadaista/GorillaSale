
var OranguSale = artifacts.require("./OranguSale.sol");


module.exports = function(deployer,network,accounts) {

  console.log("network is:");
  console.log(network);

  if(network == "test"){
    console.log("skip all and go to testcases directly");
    return "no need to deploy in 2_deploy_contracts";
  }

  const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 120; // 2m  in the future


  console.log("starttime is:"+startTime);
  const endTime = startTime + (86400 * 365); // 365 days
  console.log("endTime is:"+endTime);

  const maxrate = 5;
  const rate = 3;
  const minrate = 1;

  const wallet = accounts[0];


 
//  deployer.deploy(Sale, new web3.BigNumber(startTime), 
//                        new web3.BigNumber(endTime), 
//                        new web3.BigNumber(rate), 
//                        wallet);

  const preminedOwner = accounts[0];
  const cap = 1000 * 10**18;//1000 eth
  const premined = 300 * 10**15// 300 tokens are premined
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
