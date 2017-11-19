// Increases testrpc time by the passed duration in seconds
function increaseTime(duration) {
  const id = Date.now()

  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: '2.0',
      method: 'evm_increaseTime',
      params: [duration],
      id: id,
    }, err1 => {
      if (err1) return reject(err1)

      web3.currentProvider.sendAsync({
        jsonrpc: '2.0',
        method: 'evm_mine',
        id: id+1,
      }, (err2, res) => {
        return err2 ? reject(err2) : resolve(res)
      })
    })
  })
}

/**
 * Beware that due to the need of calling two separate testrpc methods and rpc calls overhead
 * it's hard to increase time precisely to a target point so design your test to tolerate
 * small fluctuations from time to time.
 *
 * @param target time in seconds
 */
function increaseTimeTo(target) {
  let now = latestTime();
  if (target < now) throw Error(`Cannot increase current time(${now}) to a moment in the past(${target})`);
  let diff = target - now;
  return increaseTime(diff);
}

const duration = {
  seconds: function(val) { return val},
  minutes: function(val) { return val * this.seconds(60) },
  hours:   function(val) { return val * this.minutes(60) },
  days:    function(val) { return val * this.hours(24) },
  weeks:   function(val) { return val * this.days(7) },
  years:   function(val) { return val * this.days(365)}
};


const BigNumber = web3.BigNumber;

// Returns the time of the last mined block in seconds
function latestTime() {
  return web3.eth.getBlock('latest').timestamp;
}

// some constants to manage amounts
const second     = 1;
const day        = 86400 * second;
const week       = day * 7;
const wei        = 1; //1 wei = 1 wei
const ether      = 1e18 * wei;
const gorilloshi = 1;
const gorilla    = 1e15 * gorilloshi; 


const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const OranguSale = artifacts.require('./OranguSale.sol');
const GorillaToken = artifacts.require('./GorillaToken.sol');

contract('OranguSale', function ([owner, wallet, investor]) {

  
  


  beforeEach(async function () {
    this.startTime = latestTime() + 1 * second;
    this.endTime =   this.startTime + 1*week;
    this.afterEndTime = this.endTime + 1*second;
    this.rate = 3; //tokens per wei (espressed in smallest fractional units)
    this.maxrate = 6;
    this.minrate = 2;
    this.cap = 10*ether; //10 ether
    this.preminedOwner=owner;
    this.premined = 13 * gorilla;


    this.crowdsale = await OranguSale.new(this.startTime, 
                                          this.endTime, 
                                          this.rate, 
                                          this.maxrate,
                                          this.minrate,
                                          wallet,
                                          this.preminedOwner,
                                          this.cap, 
                                          this.premined);


    this.token = GorillaToken.at(await this.crowdsale.token());

  });


  it('should create crowdsale with correct parameters', async function () {
    this.crowdsale.should.exist;
    this.token.should.exist;
    
    (await this.crowdsale.startTime()).should.be.bignumber.equal(this.startTime);
    (await this.crowdsale.endTime()).should.be.bignumber.equal(this.endTime);
    (await this.crowdsale.rate()).should.be.bignumber.equal(this.rate);

    (await this.crowdsale.MAXRATE()).should.be.bignumber.equal(this.maxrate);
    (await this.crowdsale.MINRATE()).should.be.bignumber.equal(this.minrate);
    (await this.crowdsale.wallet()).should.be.equal(wallet);
    (await this.crowdsale.cap()).should.be.bignumber.equal(this.cap);
    (await this.token.balanceOf(this.preminedOwner)).should.be.bignumber.equal(this.premined);

  });


  it('crowdsale should be token owner', async function () {
    const owner = await this.token.owner()
    owner.should.equal(this.crowdsale.address)
  });


  it('should accept payments and ship tokens at rate', async function () {
    const investmentAmount = 1*ether;
    const expectedTokenAmount = new BigNumber(this.rate * investmentAmount);
    let totalSupplyBefore = await this.token.totalSupply();

    (await this.crowdsale.paused()).should.be.equal(false);

    await increaseTimeTo(this.startTime);

    await this.crowdsale.buyTokens(investor, {value: investmentAmount, from: investor}).should.be.fulfilled;

    (await this.token.balanceOf(investor)).should.be.bignumber.equal(expectedTokenAmount);

    (await this.token.balanceOf(investor)).should.be.bignumber.equal(expectedTokenAmount);
    (await this.token.totalSupply()).should.be.bignumber.equal(totalSupplyBefore.add(expectedTokenAmount));
  });


  it('should reject payments during the sale if paused', async function () {
    await increaseTimeTo(this.startTime); 
    await this.crowdsale.send(1).should.be.fulfilled;
    await this.crowdsale.pause();
    (await this.crowdsale.paused()).should.be.equal(true);
    await this.crowdsale.send(1).should.be.rejected;
  });

  it('should reject buyTokens tx during the sale if paused', async function () {
    await increaseTimeTo(this.startTime); 
    await this.crowdsale.buyTokens(investor, {value: 0.1*ether, from: investor}).should.be.fulfilled;
    await this.crowdsale.pause();
    (await this.crowdsale.paused()).should.be.equal(true);
    await this.crowdsale.buyTokens(investor, {value: 0.1*ether, from: investor}).should.be.rejected;
  });

  it('should increase the balance of wallet after a buy', async function () {
    await increaseTimeTo(this.startTime); 

    let oldBalance = await web3.eth.getBalance(wallet);
    console.log("oldBalance:" + oldBalance);

    await this.crowdsale.send(1*ether).should.be.fulfilled;
    let newBalance = await web3.eth.getBalance(wallet);
    console.log("newBalance:"+newBalance);
    newBalance.should.be.bignumber.equal(oldBalance.add(1*ether)); 

  });




  it('should reject payments over cap', async function () {
    await increaseTimeTo(this.startTime);
    await this.crowdsale.send(this.cap);
    await this.crowdsale.send(1).should.be.rejected;
  });

  it('should change rate', async function () {
    await increaseTimeTo(this.startTime);
    await this.crowdsale.setRate(5);
    (await this.crowdsale.rate()).should.be.bignumber.equal(5);
  });


  it('should reject change rate outside limits', async function () {
    await increaseTimeTo(this.startTime);
    await this.crowdsale.setRate(this.minrate - 1).should.be.rejected;
    await this.crowdsale.setRate(this.maxrate + 1).should.be.rejected;
    
  });


/*
  it('should not accept payments before start', async function () {
    await this.crowdsale.send(ether(1)).should.be.rejectedWith(EVMThrow);
    await this.crowdsale.buyTokens(investor, {from: investor, value: ether(1)}).should.be.rejectedWith(EVMThrow);
  });

  it('should accept payments during the sale', async function () {
    const investmentAmount = ether(1);
    const expectedTokenAmount = RATE.mul(investmentAmount);

    await increaseTimeTo(this.startTime);
    await this.crowdsale.buyTokens(investor, {value: investmentAmount, from: investor}).should.be.fulfilled;

    (await this.token.balanceOf(investor)).should.be.bignumber.equal(expectedTokenAmount);
    (await this.token.totalSupply()).should.be.bignumber.equal(expectedTokenAmount);
  });

  it('should reject payments after end', async function () {
    await increaseTimeTo(this.afterEnd);
    await this.crowdsale.send(ether(1)).should.be.rejectedWith(EVMThrow);
    await this.crowdsale.buyTokens(investor, {value: ether(1), from: investor}).should.be.rejectedWith(EVMThrow);
  });

  it('should reject payments over cap', async function () {
    await increaseTimeTo(this.startTime);
    await this.crowdsale.send(CAP);
    await this.crowdsale.send(1).should.be.rejectedWith(EVMThrow);
  });

  it('should allow finalization and transfer funds to wallet if the goal is reached', async function () {
    await increaseTimeTo(this.startTime);
    await this.crowdsale.send(GOAL);

    const beforeFinalization = web3.eth.getBalance(wallet);
    await increaseTimeTo(this.afterEndTime);
    await this.crowdsale.finalize({from: owner});
    const afterFinalization = web3.eth.getBalance(wallet);

    afterFinalization.minus(beforeFinalization).should.be.bignumber.equal(GOAL);
  });

  it('should allow refunds if the goal is not reached', async function () {
    const balanceBeforeInvestment = web3.eth.getBalance(investor);

    await increaseTimeTo(this.startTime);
    await this.crowdsale.sendTransaction({value: ether(1), from: investor, gasPrice: 0});
    await increaseTimeTo(this.afterEndTime);

    await this.crowdsale.finalize({from: owner});
    await this.crowdsale.claimRefund({from: investor, gasPrice: 0}).should.be.fulfilled;

    const balanceAfterRefund = web3.eth.getBalance(investor);
    balanceBeforeInvestment.should.be.bignumber.equal(balanceAfterRefund);
  });
  */

});