import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class Movie extends Component {
    changeRental = () =>{
        const userIndex = this.findUserIndex()
        this.props.changeRental(this.props.movie.id, this.props.userId, userIndex)
    }

    findUserIndex = () => {
        const userId = this.props.userId
        let users = JSON.parse(localStorage.users)
        const userIndex = users.map(u => u.id).indexOf(userId)
        return userIndex
    }
    render() {
        let movieId = this.props.movie.id
        return (
            <div className = "movie">
                <p className="movie-title">{this.props.movie.title}</p>
                <Link to ={`/movies/${movieId}`}><img src={this.props.movie.img} alt = ""></img></Link>
                {this.props.movie.isRented ? <div className = "remove" onClick = {this.changeRental}> Remove </div> 
                : <div className = "rent" onClick = {this.changeRental}> Rent </div>}
            </div>
        );
    }
}

export default Movie;