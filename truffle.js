

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    
    test: {
      host: "localhost",
      port: 8545,
      network_id: "*",
    },   

    mainnet: {
    host: "127.0.0.1", // Random IP for example purposes (do not use)
    port: 8545,
    network_id: 1,        // Ethereum test network
    // optional config values:
    gas: 4700000,
    gasPrice: 1000000000,
    // from - default address to use for any transaction Truffle makes during migrations
    // provider - web3 provider instance Truffle should use to talk to the Ethereum network.
    //          - if specified, host and port are ignored.
   },
   ropsten: {
    host: "127.0.0.1", // Random IP for example purposes (do not use)
    port: 8545,
    network_id: 3,        // Ethereum test network
    // optional config values:
    gas: 4700000,
    gasPrice: 22000000000,
    // from - default address to use for any transaction Truffle makes during migrations
    // provider - web3 provider instance Truffle should use to talk to the Ethereum network.
    //          - if specified, host and port are ignored.
   }
  }
};
