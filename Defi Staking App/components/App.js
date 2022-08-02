import React, { Component } from 'react'
import './App.css'
import Navbar from './Navbar'
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json'
import RWD from '../truffle_abis/RWD.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'


class App extends Component {

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }
    //load web3 -- connecting to metamask
    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3){
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('No ethereum browser detected. Google metamask')
        }
    }

    //load blockchain data
    async loadBlockchainData() {
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({account: account[0]})
        //console.log(account)
        const networkId= await web3.eth.net.getId();
        //console.log(networkId, 'Network ID')

        //Load Tether Contract
        const tetherData = Tether.networks[networkId];
        
        //if tetherData is loaded then load contract and set state
        if (tetherData) {
            const tether= new web3.eth.Contract(Tether.abi, tetherData.address) //load contract
            this.setState({tether})

            //update balance
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call() // need to use .methods.methodName and .call bc it is being called through web3
            this.setState({tetherBalance: tetherBalance.toString()}) //need to be explicit to use toString()
            console.log({balance: tetherBalance},'Tether Balance')
        } 
        else {
            window.alert('Error! Tether contract not deployed - No detected Network!')
        }

        /*Load in rwd contract, db contract, rwd contract needs to update reward balance, update state of db as well as staking balance*/

        //Load rwd Contract
        const rwdData = RWD.networks[networkId];

        //if Reward Contract Data is loaded then load contract and set state
        if (rwdData) {
            const rwd= new web3.eth.Contract(RWD.abi, rwdData.address) //load contract
            this.setState({rwd})

            //update balance
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call() 
            this.setState({rwdBalance: rwdBalance.toString()}) 
            console.log({balance: rwdBalance}, 'RWD Balance')
        } 
        else {
            window.alert('Error! Reward contract not deployed - No detected Network!')
        }

        //Load decentralBank Contract
        const dbData = DecentralBank.networks[networkId];

        //if Decentral Bank Contract Data is loaded then load contract and set state
        if (dbData) {
            const decentralBank= new web3.eth.Contract(DecentralBank.abi, dbData.address) //load contract
            this.setState({decentralBank})

            //update balance
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call() 
            this.setState({stakingBalance: stakingBalance.toString()}) 
            console.log({balance: stakingBalance}, 'Staking Balance')
        } 
        else {
            window.alert('Error! Decentral Bank contract not deployed - No detected Network!')
        }

        //update loading
        this.setState({loading: false})

    }
    constructor(props) {
        super(props)
        this.state = {
            //set default state for vars
            account: '0x0000', //default
            tether: {}, //bring in the Tether Contract as object
            rwd: {},
            decentralBank: {},
            tetherBalance: '0',
            rwdBalance: '0',
            stakingBalance: '0',
            loading: true

        }
    }
    //react code will render to the webpage
    render() {
        return (
            <div>
                <Navbar account={this.state.account}/>
            
                <div className='text-center'>
                    {console.log(this.state.loading)}
                </div>
            </div>
        )
    }
}


export default App;
