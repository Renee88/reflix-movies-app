import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Home extends Component {
    logOut = () => {
        let users = JSON.parse(localStorage.users)
        let userId = this.props.chosenUser
        console.log(userId)
        let userIndex = 0
        for (let user of users) {
            if (user.id === userId) {
                this.props.logOut(userIndex)
                return
            }
            userIndex++
        }
    }

    render() {
        let userId = this.props.chosenUser
        return (<div id="home">
            <div className="links">
                <Link to="/"><span onClick={this.logOut}>Home</span></Link>
                {userId ? <Link to={`/catalog/${userId}`} ><span>Catalog</span></Link> : <Link to = "/"><span>Sign up</span></Link>}
                <Link to="/"><span id="logo">Reflix</span></Link>
            </div>
            {userId ? <div id="search">
                <input type="text" placeholder="What are you looking for?" onChange={this.props.updateSearchInput}></input>
                <button>Search</button> 
            </div> : null}
                
        </div>)
    }
}

export default Home;