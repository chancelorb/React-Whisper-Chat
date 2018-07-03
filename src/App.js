import React, { Component } from 'react';
import './App.css';
import {decodeFromHex, encodeToHex} from './components/HexUtils';
import SymmetricKeyConfig from './components/SymmetricKeyConfig.js';
import AsymmetricKeyConfig from './components/AsymmetricKeyConfig.js';
import Web3 from 'web3';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      encoded: "",
      decoded: "",
      toEncode: "",
      toDecode: ""
    }
    this.decodeFromHex = this.decodeFromHex.bind(this);
    this.encodeToHex = this.encodeToHex.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
		const { name, value } = e.target;
    this.setState({
			[name]: value
			})
	}

  decodeFromHex(hex) {
  	if (!hex || hex.length < 4 || hex[0] != "0" || hex[1] != "x" || hex.length % 2 != 0) {
  		console.log(`Invalid hex string: ${hex}`);
  		return "";
  	} else {
  		let result = "";

  		for (let i = 2; i<hex.length; i+=2) {
  			let n = parseInt(hex.slice(i, i+2), 16);
  			result += String.fromCharCode(n);
  		}

  		try {
        this.setState({
          decoded: result
        })
        //use JSON.parse when sending to blockchain
  		} catch (e) {
  			return "Error: message could not be decrypted";
  		}
  	}
  }

  encodeToHex(string) {
  	let hexEncodedMessage = "0x";
  	try {
  		for (let c of string) {
  			hexEncodedMessage += c.charCodeAt(0).toString(16);
  		}
  	} catch(e) {

  	}
    this.setState({
      encoded: hexEncodedMessage
    })
    // console.log(JSON.parse(hexEncodedMessage))
  }

  render() {
    let encoded = this.state.encoded;
    let decoded = this.state.decoded;
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/2000px-Ethereum_logo_2014.svg.png" className="App-logo" alt="Oepsie, no logo" />
          <h1 className="App-title">Welcomed By Chancelorb</h1>
        </header>
        <p className="App-intro">
          Hello, Ethereum
        </p>

        <div className="row">
          <div className='col-6'>
            <label>Encode text:<br />
            <input onChange={this.handleChange} type="text" name="toEncode"/><br />
            <button className="btn btn-success" onClick={() => {this.encodeToHex(this.state.toEncode)}}>Press</button>
            </label>
            <label>Decode hex:<br />
            <input onChange={this.handleChange} type="text" name="toDecode"/><br />
            <button className="btn btn-success" onClick={() => {this.decodeFromHex(this.state.toDecode)}}>Press</button>
            </label>
          </div>
          <div className='col-6'>
            <p>Encoded: {encoded}</p>
            <p>Decoded: {decoded}</p>
          </div>
        </div>
        <div className="row">
          <SymmetricKeyConfig />
          <AsymmetricKeyConfig />
        </div>

      </div>
    );
  }
}

export default App;
