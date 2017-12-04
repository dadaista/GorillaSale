# GorillaSale
Simple eth tokensales based on Open Zeppelin


- GorillaSale
- OranguSale


# Pre-requisites
This has been tested on Ubuntu 14.04, but I'm confident can work on other OS as well.
```
Truffle v4.0.1 (core: 4.0.1) with Solidity v0.4.18 (solc-js)
Open zeppelin 1.4.0
Geth 1.7.2-stable-1db4ecdc
EthereumJS TestRPC v6.0.3 (ganache-core: 2.0.2)
Node js version 8.9.1
```

# My stack
I launched Ubuntu 14.04 VM on Parallels/MacOsX. In my MAC I have also Chrome with Metamask as a second wallet to launch payments back and forth.  

Tested also on Ubuntu 16.04


# Install modules

Get into the root folder of your project and launch

```
npm install
```
beware this should install Open Zeppelin 1.4.0 too



# Testing with truffle test and testrpc

Make sure you have testrpc installed. Close geth or any other ETH client running on port 8545. 

Launch testrpc in a terminal

```
testrpc
```

Now go to the root folder of project and type in ANOTHER terminal

```
truffle test
```

You should see all tests passed. CLOSE testrpc and go to next steps for deployment on Ropsten



# Syncing the chain to test on Ropsten


This is not a tutorial on geth commands, however lets go through few useful instructions. 

This will launch geth as a rpc server. 
```
parallels@ubuntu:~$ geth --testnet --rpc --rpcapi="db,eth,net,web3,personal,web3"
```
geth requires all the chain to be local. This may take time, but you need it. So relax and get your chain in sync.

WAIT ... WAIT ... WAIT ...


Now open a second bash terminal and attach to the running geth node typing
```
geth attach http://127.0.0.1:8545
```

From now on you have two geth(s), one instance is the node, the second one is just a javascipt terminal attached to the first one.

On the attached console, while geth is syncing, you can launch commands like:

```
> web3.eth.blockNumber
2003004
```
Important! The outcome must be equal to the block number you see in a block explorer like ropsten.etherscan.io.  This means you're synced, otherwise you have to wait the sync to complete.


# Deploying

First of all, create a new account on your geth. Follow the official docs to do that. 
No surprise, to deploy on a testnet you need fake ethers, you can sort it out starting with Google and searching ropsten faucet. A clever way is to install Metamask, connect to Ropsten and then click Buy. You'll get 1 ether at a time, not bad for testing your contracts.

In assume you're synced and you filled your address with some ethers. 

Now you must unlock your account, on the geth attached console type:
```
> personal.unlockAccount("your address here","your password here")
true
```

Now go back, or open another bash terminal in the project root and type
```
truffle migrate --network=ropsten --reset
```


Hold your breath, if everything is working fine you should see something like (addresses will differ)
```
Using network 'ropsten'.
Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x11f42c86bd34ef6b40529915b17a70b23c5b7930c8a9c6d0d04be209d175d8d4
  Migrations: 0x3d54ba72dc923c4bebddc7a18edf91c4ba197cb5
Saving successful migration to network...
  ... 0x07eef1de7571937b9580a0b54c5a3029970087d34eef240fe1bf2999d2172212
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying GorillaToken...
  ... 0x6db5932d721192aa227bed58cc217061ccb9243d92bf71e3662b50c06660ef4c
  GorillaToken: 0x88ebe70bc4823fccf101d0c914749cd1d4d194b3

```
Otherwise you're in trouble, and *troubles are hard to shoot in Ethereum-land.*




# So how can I test

Copy paste the address of your newly deployed GorillaSale (or OranguSale) from the consolle output. Then use an account to send (fake) ether. You should see tokens in your balance.
