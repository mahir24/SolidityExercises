const Tether = artifacts.require('Tether')
const RWD = artifacts.require('RWD')
const DecentralBank = artifacts.require('DecentralBank')

module.exports = async function (deployer, network, accounts) {
  //deploy mock tether contract
  await deployer.deploy(Tether);
  const tether = await Tether.deployed()
  
  //deploy Reward contract
  await deployer.deploy(RWD);
  const rwd = await RWD.deployed()//wait till it is deployed to receive contract

  //deploy Decentral Bank contract
  await deployer.deploy(DecentralBank, rwd.address, tether.address);
  const decentralBank = await DecentralBank.deployed()

  //Transfer all RWD tokens to Decentral Bank -- have access to transfer function because of line 11
  await rwd.transfer(decentralBank.address,'1000000000000000000000000')// 1M tokens 

  //distribute 100 tether to investors
  await tether.transfer(accounts[1], '100000000000000000000')
};
