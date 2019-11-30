import React, { Component } from 'react';
import Movie from './Movie';


class Catalog extends Component {
    render() {
        let movies = this.props.movies
        let searchInput = this.props.search
        let matchedMovies = movies.filter(m => m.title.toLowerCase().includes(searchInput))
        let userIndex = this.props.match.params.id
        return (
            <div>
                <p>Catalog</p>
                <div id="catalog">
                    {matchedMovies.length ? matchedMovies.map((m, i) => <Movie movie={m} movieIndex={i} userIndex = {userIndex} changeRental={this.props.changeRental} />) 
                    :movies.map((m, i) => <Movie movie={m} movieIndex={i} userIndex = {userIndex} changeRental={this.props.changeRental} />) }
                </div>
            </div>
        );
    }
}

export default Catalog;