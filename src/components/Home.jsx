import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Rented from './Rented';

class Home extends Component {
    
    render() {
        let userIndex = this.props.chosenUser
        console.log(userIndex)
        return (<div id="home">
            <div className="links">
                <Link to="/"><span>Home</span></Link>
                <Link to= {`/catalog/${userIndex}`} ><span>Catalog</span></Link>
                <p id="logo"><span>Reflix</span></p>
            </div>
            <div id="search">
                <input type="text" placeholder="What are you looking for?" onChange = {this.props.updateSearchInput}></input>
                <button>Search</button>
            </div>
        </div>

        );
    }
}

export default Home;