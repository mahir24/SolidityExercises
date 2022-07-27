import React, { Component } from 'react'
import './App.css'
import Navbar from './Navbar'


class App extends Component {
    //react code will render to the webpage
    render() {
        return (
            <div>
                <Navbar/>
            
                <div className='text-center'>
                    <h>Hello, World!</h>
                </div>
            </div>
        )
    }
}


export default App;
