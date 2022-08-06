import React, { Component } from 'react'
import tether from '../tether.png'
class Main extends Component {
    render() {
        console.log(this.props.stakingBalance, 'Staking Balance')
        console.log(this.props.tetherBalance, 'Tether Balance')
        console.log(this.props.rwdBalance, 'RWD Balance')

        return (
            <div id = 'content' className='mt-3'>
                <table className = 'table text-muted text-center'>
                    <thead>
                    <tr style ={{color: 'black'}}>
                        <th scope ='col'>Staking Balance</th>
                        <th scope ='col'>Rewards Balance</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} USDT</td>
                            <td>{window.web3.utils.fromWei(this.props.rwdBalance, 'Ether')} RWD</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <form style = {{borderSpacing: '0 1em'}}
                    onSubmit={(event) => {
                        event.preventDefault() //make sure the button is not repeatedly clicked
                        let amount 
                        amount = this.input.value.toString()
                        amount = window.web3.utils.toWei(amount, 'Ether') //convert amount to wei
                        this.props.stakeTokens(amount) //call function
                    }}>
                        <label className = 'float-left' style={{marginLeft: '15px'}}> <b>Stake Tokens</b> </label>
                        <span className='float-right' style={{marginRight: '15px'}}>
                         Balance:{window.web3.utils.fromWei(this.props.tetherBalance, 'Ether')} $USDT
                        </span>
                        <div className= 'input-group mb-4'> 
                            <input 
                            ref = {(input) => {this.input=input}}
                            type = 'text' 
                            placeholder='0' 
                            required />
                            
                            <div className = 'input-group-open'>
                                <div className='input-group-text'>
                                    <img src ={tether} alt='tether' height='32' />
                                    &nbsp;&nbsp;&nbsp; USDT
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type='submit' className='btn btn-primary btn-lg btn-block'>DEPOSIT</button>
                        </div>
                    </form>
                    <div>
                        <button type='submit' className='btn btn-primary btn-lg btn-block'>WITHDRAW</button>
                    </div>
                    <div className='card-body text-center' style={{color:'blue'}}>
                        AIRDROP
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Main;