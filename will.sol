//anything above 0.5.7
pragma solidity ^0.5.7;

contract Will {
    //address is a special type
    address owner; 
    uint fortune;
    bool deceased;

    //payable is a keyword that allows the function to send and recieve eth
    constructor() payable public {
        owner = msg.sender; //owner will be whoever calls the function -- sender is address that is being called
        fortune = msg.value; //shows how much eth is being sent 
        deceased = false;
    }

    //create a modifier so the only person that can call the contract is the owner
    modifier onlyOwner {
        //require is a conditional statement
        require(msg.sender == owner);
        _; //_ tells the function to continue to the actual function after modifier is run -- prevents other people who aren't the owner from calling the function
    }
    //create modifier so that we only allocate funs if friends gramps is dead
    modifier mustBeDeceased {
        require (deceased == true);
        _;
    }

    //create a list(array) for the addresses that will inherit the LOOT
    address payable[] familyWallets; //array of addresses that can send/recieve eth
    
    //key store value -- using Mapping
    
}