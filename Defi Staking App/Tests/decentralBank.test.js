// const _deploy_contracts = require('../migrations/2_deploy_contracts')


//bring in contracts
const RWD = artifacts.require('RWD')
const Tether = artifacts.require('Tether')
const DecentralBank = artifacts.require('DecentralBank')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('decentralBank', ([owner, customer]) => {    //[owner, customer] just names the first 2 indexes of accounts from ganache 
    let tether, rwd, decentralBank

    //function to convert a number to WEI
    function tokens(number) {
        return web3.utils.toWei(number, 'ether')
    }
    //before allows any code to run first before the tests
    before(async() => {
        //assign vars here -- load contracts
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(rwd.address, tether.address)

        //transfer all tokens to Decentral Bank(1M)
        await rwd.transfer(decentralBank.address, tokens('1000000'))

        //transfer 100 tokens to customer accounts
        await tether.transfer(customer, tokens('100'), {from: owner}) //specify where the 100 tokens are coming from
    })
    //all code goes here for testing

    //Name matching test
    describe('Mock Tether Deployment', async() => { //description of the test
        it('matches name successfully', async() => {//match contract name
            //logic of test
            const name = await tether.name(); 
            assert.equal(name, 'Mock Tether')  
        })
    })
    
    //Name matching test
    describe('Reward Token Deployment', async() => { //description of the test
        it('matches name successfully', async() => {//match contract name
            //logic of test
            const name = await rwd.name(); 
            assert.equal(name, 'Reward Token')  
        })
    })

    //Name matching test
    describe('Decentral Bank Deployment', async() => { //description of the test
        it('matches name successfully', async() => {//match contract name
            //logic of test
            const name = await decentralBank.name(); 
            assert.equal(name, 'Decentral Bank')  
        })

        //check if all tokens transferred to the decentral bank(accounts[0]) is successful
        it('contract has 1 Million tokens', async() => {
            balance = await rwd.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'))
        })

        describe('Yield Farming', async() => {
            it('rewards tokens for staking', async() => {
                //logic of test
                let result
    
                //check investor balance
                result = await tether.balanceOf(customer)
                assert.equal(result.toString(), tokens('100'), 'balance before staking') //user should have 100 tokens up
                
                //check staking from customer of 100
                await tether.approve(decentralBank.address, tokens('100'), {from: customer}) //(address to approve the transaction)
                await decentralBank.depositTokens(tokens('100'), {from: customer}) //
                
                //check updated balance after staking everything
                result = await tether.balanceOf(customer)
                assert.equal(result.toString(), tokens('0'), 'customer balance after staking') //user should have 0 tokens 

                //check updated balance of Decentral Bank
                result = await decentralBank.stakingBalance(customer)
                assert.equal(result.toString(), tokens('100'), 'decentral bank balance after user staked') //db should have 100 tokens up

                //isStaking?
                result = await decentralBank.isStaking(customer)
                assert.equal(result.toString(), 'true', 'customer isStaking status after staking')

                //issue tokens 
                await decentralBank.issueTokens({from: owner})

                //ensure only owner is able to issue 
                await decentralBank.issueTokens({from: customer}).should.be.rejected;

                //unstake tokens
                await decentralBank.unstakeTokens({from: owner})

                //Check unstaking balances
                result = await tether.balanceOf(customer)
                assert.equal(result.toString(), tokens('100'), 'user balance after unstaking') //user should have 100 tokens up

                result = await tether.balanceOf(decentralBank.address)
                assert.equal(result.toString(), tokens('0'), 'Decentral bank balance after unstaking') //db should have 0 tokens up

                //isStaking update?
                result = await decentralBank.isStaking(customer)
                assert.equal(result.toString(), 'false', 'customer isStaking status after unstaking')

            })

            
        })

        
    })

    


})
