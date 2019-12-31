import React, { Component } from 'react';
import Movie from './Movie';
import { Redirect } from 'react-router-dom';

class Rented extends Component {

    componentDidMount(){
        let users = JSON.parse(localStorage.users)
        let userId = this.props.match.params.id
        let currUser = users.find( u => u.id == userId)
        currUser.isLoggedIn = true 
        localStorage.users = JSON.stringify(users)
    }

    render() {
        let users = this.props.users
        let userId = this.props.match.params.id
        let currUser = users.find(u => u.id == userId)
        let userName = currUser ? currUser.name : undefined
        let searchInput = this.props.search
        let rentedMovies = currUser ? currUser.catalog.filter(m=> m.isRented) : []
        let matchedMovies = rentedMovies.filter(m => m.title.toLowerCase().includes(searchInput))
        return (
            <div>
                {matchedMovies.length ? <p>Hello, {userName} you rented</p> :<p>No rented movies yet, {userName}.</p> }
                <div id="rented">{matchedMovies.length ? matchedMovies.map(m => <Movie movie={m} userId = {userId} changeRental = {this.props.changeRental} />)
                :rentedMovies.map(m => <Movie movie={m} userId = {userId} changeRental = {this.props.changeRental} />)}</div>
            </div>

        );
    }
}

export default Rented;