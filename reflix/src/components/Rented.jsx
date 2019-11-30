import React, { Component } from 'react';
import Movie from './Movie';

class Rented extends Component {
    render() {
        let users = JSON.parse(this.props.users)
        let userIndex = this.props.match.params.id
        let searchInput = this.props.search
        let rentedMovies = users[userIndex].catalog.filter(m=> m.isRented)
        console.log(rentedMovies)
        let matchedMovies = rentedMovies.filter(m => m.title.toLowerCase().includes(searchInput))
        return (
            <div>
                {matchedMovies.length ? <p>You Rented</p> : null}
                <div id="rented">{matchedMovies.length ? matchedMovies.map(m => <Movie movie={m} userIndex = {userIndex} changeRental = {this.props.changeRental} />)
                :rentedMovies.map(m => <Movie movie={m} userIndex = {userIndex} changeRental = {this.props.changeRental} />)}</div>
            </div>
        );
    }
}

export default Rented;