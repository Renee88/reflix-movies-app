import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
class User extends Component {
    
    changeUser = () => {
        this.props.changeUser(this.props.userIndex)
    }


    render() {
        let color = this.props.color
        let userId = this.props.userId
        let userIndex = this.props.userIndex
        
        return (
            <Link to ={`users/${userId}`}><div className = "user" style = {{backgroundColor: this.props.assignColor(color,userIndex)}} onClick = {this.changeUser} >
                {this.props.name}
            </div></Link>
        );
    }
}

export default User;