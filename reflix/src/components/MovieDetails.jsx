import React, { Component } from 'react';

class MovieDetails extends Component {

    render() {
        let movies = this.props.movies
        let movie = movies.find( m => m.id == this.props.match.params.id) 
        return (
            <div className = "info-container">
                <img src={movie.img} ></img>
                <div className = "movie-details" alt = "">{movie.descrShort}</div>
            </div>
        );
    }
}

export default MovieDetails;