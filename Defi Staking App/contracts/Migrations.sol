// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
  address public owner = msg.sender;
  uint public last_completed_migration;

  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
// contract Migrations{
//     address public owner;
//     uint public last_completed_migration;

//     constructor() {
//         owner = msg.sender; //the person who is currently connecting with the contract

//     }

//     modifier restricted() {
//         if (msg.sender == owner) _; //if the sender is true then continue with the function(_)

//     }

//     function setCompleted(uint completed) public restricted {
//         last_completed_migration = completed; // make the last completed migration to the current migration
//     }

//     function upgrade(address new_address) public restricted{
//         Migrations upgraded = Migrations(new_address); //upgraded will run set_completed function
//         upgraded.setCompleted(last_completed_migration); //takes in last completed 
//     }
// }