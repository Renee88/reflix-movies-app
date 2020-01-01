import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './components/Home';
import Catalog from './components/Catalog';
import MovieDetails from './components/MovieDetails';
import Rented from './components/Rented';
import Users from './components/Users';
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = {
      catalog: [
        { id: 0, isRented: false, title: "Tarzan", year: 1999, img: "https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811", descrShort: "Tarzan was born into wealth but raised into incredible misfortune. Shiprweck, parents mauled by a jaguar. Luckily, a troop of gorillas took him in, but the Big Daddy gorilla never took a liking to him. That is, until the end when it's too late. Why is it too late? Watch and find out." },
        { id: 1, isRented: false, title: "The Lion King", img: "https://img00.deviantart.net/b782/i/2006/207/e/7/the_lion_king_front_cd_cover_by_peachpocket285.jpg", year: 1994, descrShort: "A young lion prince named Simba is born into wealth but raised into incredible misfortune. Trickster uncle, dying father, usurpation. Luckily, an unlikely meerkat-warthog pair take him in and teach him The Ways of the Bum Life. Be prepared for ghostly hallucinations, wild baboons, creepy crawlies." },
        { id: 2, isRented: false, title: "Beauty and the Beast", year: 1991, img: "https://images-na.ssl-images-amazon.com/images/I/81etFyb9N-L._SL1500_.jpg", descrShort: "A kickass woman named Belle who does not succumb to social norms gets crap from a bunch of village idiots, chief amongst them a total tool named Gaston. Belle shows everyone how great she is when she turns a beast (not Gaston) into a man. Love ensues, but then the villagers fall trap to severe group-think mentality led by the main tool himself." },
        { id: 3, isRented: false, title: "The Sword in the Stone", year: 1963, img: "https://musicart.xboxlive.com/7/232a3700-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080", descrShort: "Arthur is a young boy who just wants to be a knight's squire. Alas, he is dubbed 'Wart' early on, and it was all downhill from there for a while. On a hunting trip he falls in on Merlin, literally. Merlin is a possibly-mentally-unstable-and-ethically-dubious Wizard that turns Arthur into a literate, at-one-point harassed squirrel. Watch to find out what the heck that means." },
        { id: 4, isRented: false, title: "Beauty and the Beast", year: 2016, img: "https://images-na.ssl-images-amazon.com/images/I/51ArFYSFGJL.jpg", descrShort: "Basically the same as the original, except now Hermi-- Emma Wattson plays Belle, fittingly so some would say, given how actively progressive she is regarding women's rights. Rumor has it that in the bonus scenes she whips out a wand and turns Gaston into a toad, but in order to watch those scenes you need to recite a certain incantation." }
      ],

      users: []
      ,
      search: "",
      chosenUser: ""
    }
  }


  findMovie(userId, movieId) {
    let users = JSON.parse(localStorage.users)
    let userCatalog = users.find(u=> u.id == userId).catalog
    let index = 0
    for (let movie of userCatalog) {
      if (movie.id === movieId) {
        return index
      } else {
        index++
      }
    }
  }

  loadLocalStorage() {
    if (localStorage.users) {
      return
    }
    let users = JSON.stringify(this.state.users)
    localStorage.setItem("users", users)
    for (let user in users) {
      this.addCatalog(user)
    }

  }

  changeRentalState = (movieId, userId) => {
    let users = JSON.parse(localStorage.users)
    let movieIndex = this.findMovie(userId, movieId)
    const currUser = users.find( u => u.id == userId )
    let movieForRent = currUser.catalog[movieIndex]
    movieForRent.isRented = !movieForRent.isRented

    let newCatalog = currUser.catalog
    localStorage.users = JSON.stringify(users)

    this.setState({ users, catalog: newCatalog })
  }

  updateSearchInput = (e) => {
    let searchInput = e.target.value
    this.setState({ search: searchInput })
  }

  assignColor = (color, userIndex) => {
    let newUsers = [...this.state.users]

    if (newUsers[userIndex].color) {
      return newUsers[userIndex].color
    }

    newUsers[userIndex].color = color
    this.setState({ users: newUsers })
    return color
  }


  changeUser = (userIndex) => {
    let users = [...this.state.users]
    let chosenUser = users[userIndex].id
    this.setState({ chosenUser })
  }

  addUser = () => {
    let newUser = prompt('Enter your name')
    let users = [...this.state.users]
    let user = {}
    user.id = users[users.length - 1].id + 1
    user.name = newUser
    user.catalog = this.state.catalog
    user.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    user.isLoggedIn = false
    users.push(user)
    localStorage.users = JSON.stringify(users)
    this.setState({ users })
  }


  logOut = (userIndex) => {
    let users = localStorage.users
    users = JSON.parse(users)
    users[userIndex].isLoggedIn = false
    localStorage.users = JSON.stringify(users)
    const chosenUser = undefined
    this.setState({ chosenUser })
  }


  componentDidMount() {
    const users = localStorage.users ? JSON.parse(localStorage.users) : []
    this.setState({ users })
  }


  render() {

    return (
      <Router>
        <div id="main-container">
          <Home updateSearchInput={this.updateSearchInput} chosenUser={this.state.chosenUser} logOut={this.logOut} />
          <Route exact path="/" render={() => <Users users={this.state.users} assignColor={this.assignColor} changeUser={this.changeUser} addUser={this.addUser} />} />

          <Route exact path='/catalog/'><Redirect to="/" /></Route>
          <Route exact path='/catalog/undefined'><Redirect to="/" /></Route>
          <Route exact path='/users/'><Redirect to="/" /></Route>
          <Route exact path='/users/undefined'><Redirect to="/" /></Route>
          <Route exact path='/movies/undefined'><Redirect to="/" /></Route>

          <Route exact path="/catalog/:id" render={({ match }) => <Rented match={match} users={this.state.users} changeRental={this.changeRentalState} search={this.state.search} /> } />
          <Route exact path="/catalog/:id" render={({ match }) => <Catalog match={match} movies={this.state.catalog} changeRental={this.changeRentalState} search={this.state.search} />} />
          <Route exact path="/users/:id" render={({ match }) => <Rented match={match} users={this.state.users} changeRental={this.changeRentalState} search={this.state.search} />} />
          <Route exact path="/movies/:id" render={({ match }) => <MovieDetails match={match} movies={this.state.catalog} chosenUser={this.state.chosenUser} />} />
        </div>
      </Router>
    )
  }

}

export default App;
