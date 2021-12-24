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
    
    //key store value -- using mapping
    mapping(address => uint) inheritance; //each address should have its own uint -- mapping through the inheritance

    //set inheritance for each addresses
    function setInheritance(address payable wallet, uint amount) public onlyOwner{ //only the owner can run this function
        //add wallet to family wallets
        familyWallets.push(wallet); //push the parameter wallet address into the familyWallets array
        inheritance[wallet] = amount; //maps the inheritance amount to each wallet
    }

    //pay each family member based on wallet address
    function payout() private mustBeDeceased { //using a dev created modifier to only execute when gramps is dead
        
        for (uint i=0; i <familyWallets.length; i++) {
            //.transfer takes in the amount as an argument 
            familyWallets[i].transfer(inheritance[familyWallets[i]]); //transferring funds from contract address to reciever address
        }

    }

    //if it was a real world smart contract it would connect to an Oracle to check if gramps died or not
    //Oracle sqitch simulation
    function isDeceased() public onlyOwner {
        deceased = true;

        payout(); // payout after deceased is confirmed
    } 

}
