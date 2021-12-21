//pragma <-- is the first line of a solidity file. indicates solidity version
pragma solidity >=0.7.0 <0.9.0;

/*create a contract that can store data and return it back
be able to :
    1. recieve info
    2. store info
    3. return info back

A smart contract is just code and data that resides at a specific address on a blockchain
*/

//contract is a function type
contract simpleStorage {
    uint storeData;

    //create setters and getters
    //public enables visibility to other contracts
    function set(uint x) public{
        storeData = x;
    }
    //view is a modifier that tells the function it cannot modify the state
    //returns  is a modifier that specifies the the type the function will return in this case a uint
    function get () public view returns (uint) {
        return storeData;
    }

    //create a storage contract that sets and gets values - only the value that it returns is multiplied 5x
    function set5x(uint x) public{
        storeData = x*5;
    }
    //view is a modifier that tells the function it cannot modify the state
    //returns  is a modifier that specifies the the type the function will return in this case a uint
    function get5x () public view returns (uint) {
        return storeData;
    }
}