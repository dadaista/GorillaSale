//var ConvertLib = artifacts.require("./ConvertLib.sol");
//var MetaCoin = artifacts.require("./MetaCoin.sol");
var SampleCrowdSale = artifacts.require("./SampleCrowdSale.sol");
var SampleCrowdSaleToken = artifacts.require("./SampleCrowdSaleToken.sol");
var Hello = artifacts.require("./Hello.sol");

module.exports = function(deployer) {
//  deployer.deploy(ConvertLib);
//  deployer.link(ConvertLib, MetaCoin);
//  deployer.deploy(MetaCoin);
    deployer.deploy(SampleCrowdSaleToken, {gas:1000000000});
    deployer.deploy(SampleCrowdSale, {gas:1000000000});

    
    deployer.deploy(Hello);
};
