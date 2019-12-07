import React, { Component } from 'react';
import Movie from './Movie';

class Rented extends Component {
    render() {
        let users = this.props.users
        let userIndex = this.props.match.params.id
        let userName = users[userIndex].name

        let searchInput = this.props.search
        let rentedMovies = users[userIndex].catalog.filter(m=> m.isRented)
        let matchedMovies = rentedMovies.filter(m => m.title.toLowerCase().includes(searchInput))
        return (
            <div>
                {matchedMovies.length ? <p>Hello, {userName} you rented</p> :<p>No rented movies yet, {userName}.</p> }
                <div id="rented">{matchedMovies.length ? matchedMovies.map(m => <Movie movie={m} userIndex = {userIndex} changeRental = {this.props.changeRental} />)
                :rentedMovies.map(m => <Movie movie={m} userIndex = {userIndex} changeRental = {this.props.changeRental} />)}</div>
            </div>
        );
    }
}

export default Rented;