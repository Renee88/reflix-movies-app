import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class MovieDetails extends Component {

    render() {
        let movies = this.props.movies
        let movie = movies.find( m => m.id == this.props.match.params.id) 
        let chosenUser = this.props.chosenUser
        return (
            <div className = "info-container">
                <img src={movie.img} ></img>
                <div className = "movie-details" alt = "">{movie.descrShort}</div>
                <Link to = {`/catalog/${chosenUser}`}><div className = "back">Back to catalog</div> </Link>
            </div>
        );
    }
}

export default MovieDetails;