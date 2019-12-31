import React, { Component } from 'react'
import User from './User';

class Users extends Component {
    addUser = () => {
        this.props.addUser()
    }

    render() {
        let users = this.props.users
        let colors = []

        for (let i = 0; i < users.length; i++) {
            let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            colors.push(randomColor)
        }

        return (
            <div id="users-title-container">
                <div id="home-title">Who's Watching?</div>
                <div id="users-container">
                    {users.map((u, i) => <User name={u.name} color={colors[i]} addCatalog={this.props.addCatalog} userId={u.id} userIndex = {i} assignColor={this.props.assignColor} changeUser={this.props.changeUser} />)}
                    <div id="add-user" className="user" onClick={this.addUser} >Add User</div>
                </div>
            </div>
        );
    }
}

export default Users;