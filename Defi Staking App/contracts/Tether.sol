// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Tether{
    string public name = 'Mock Tether';
    string public symbol = 'mUSDT';
    uint256 public totalSupply = 1000000000000000000000000; //(18 0's) 1 million tokens
    uint8 decimals = 18;
    
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    ); 

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );


    mapping(address => uint256) public balanceOf;
    mapping (address => mapping(address => uint256)) public allowance; //map into mapping 

    //balance of the current contract should be set to the total supple because msg.sender is the contract
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value)  public returns(bool success) {
        require(balanceOf[msg.sender] >= _value);//require that the balance available is greater than the amount being sent

        balanceOf[msg.sender] -= _value; //the balance is deducted by the value of the transfer
        balanceOf[_to] += _value; //balance of the address being sent to is being added

        emit Transfer(msg.sender, _to, _value);//emit the event

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value);//require that the balance available is greater than the amount being sent
        require(_value <= allowance[_from][msg.sender]);

        balanceOf[msg.sender] -= _value; //the balance is deducted by the value of the transfer
        balanceOf[_to] += _value; //balance of the address being sent to is being added

        allowance[msg.sender][_from] -= _value; //callers allowance from the sender is reduced from the amount
        emit Transfer(_from, _to, _value);//emit the event

        return true;
    }
}