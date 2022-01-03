pragma solidity >= 0.7.0 < 0.9.0;

//the contract allows only the creator to create new conversations
//anyone can send coins without any kyc or register. just use an ETH keypair

contract Coin {
    address public minter; //creator
    mapping(address=>uint) public balances; //map the addresses to a value. bc addresses carry the number

    event Sent(address from, address to, uint amount);//client can see where funds are coming and going from

    error insufficientBalance(uint requested, uint available); //creating an error msg 

    //constructor is only run when contract is deployed
    constructor() {
        minter = msg.sender;

    }

    //need to make new coins and send to address
    //only the owner can send these coins
    function mint(address receiver, uint amount) public{
        require(msg.sender == minter);
        balances[receiver] += amount; //list of recievers will add the amount to balance
    }

    //send any amount of coins to an existing address
    function send(address receiver, uint amount) public {
        if (balances[msg.sender] > amount){
            balances[receiver] += amount; //the balance of the receiver will go up
            balances[msg.sender] -= amount; //the balance of the sender will go down
            //emit will store the arguments passed in transaction logs which are stored on the blockchain
            emit Sent(msg.sender, receiver,amount);
        }
        else{
             //revert stops transaction from happening and will give back an error
           revert insufficientBalance({
               //this is a phrase mapping variables to error parameters
               requested: amount,
               available: balances[msg.sender]
           });
        }
 
    }

}