// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
  string public name = 'Decentral Bank';
  address public owner;
  Tether public tether;
  RWD public rwd;

  address[] public stakers;

  mapping(address => uint) public stakingBalance;// each address will get their own unique int
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

constructor(RWD _rwd, Tether _tether)public {
    rwd = _rwd;
    tether = _tether;
    owner = msg.sender;
}

//staking function
function depositTokens(uint _amount) public {
  //require staking amount to be greater than 0
  require(_amount > 0, 'amount cannot be 0');
    
  //transfer Tether to contract address
  tether.transferFrom(msg.sender, address(this), _amount);

  //update staking balance
  stakingBalance[msg.sender] += _amount;

  //if sender has never staked before
  if (!hasStaked[msg.sender]) {
    stakers.push(msg.sender); //update the array of stakers to add new staker
  }

  isStaking[msg.sender] = true;
  hasStaked[msg.sender] = true;

}


//issue rewards
function issueTokens() public {
  //require owner to issue tokens only
  require(msg.sender == owner, 'caller must be owner');

  for (uint i =0; i<=stakers.length; i++) {
    address recipient = stakers[i];
    
    uint balance = stakingBalance[recipient]/9;

    if(balance > 0) {
      rwd.transfer(recipient, balance); 
    }
  }
}

//unstake tokens
function unstakeTokens() public {
  uint balance = stakingBalance[msg.sender];

  require(balance >0, 'staking balance cant be less than zero');

  //transfer tokens to specified contract
  tether.transfer(msg.sender, balance);

  //reset staking balance
  stakingBalance[msg.sender] =0;

  //update staking status
  isStaking[msg.sender] = false;




}


}
