pragma solidity >= 0.7.0 < 0.9.0;

contract AddressWallets {

    uint fortune;
    address payable[] investorWallets; 
    mapping(address => uint) investors;
    
    constructor() payable public {
        fortune = msg.value;
    }

    function payout() private {

        for (uint i=0; i <investorWallets.length; i++) {
            //iterate over all the wallets and then transfer ETH to the amounts in each wallet 
            investorWallets[i].transfer(investors[investorWallets[i]]);
        }
    }

    function makePayment() public {
        //call payout function
        payout();
    }
    
    function payInvestors(address payable wallet, uint amount) public {
        investorWallets.push(wallet);
        investors[wallet] = amount;
    }
    


function checkInvestors() public view returns (uint) {
    return investorWallets.length;
}    
}
