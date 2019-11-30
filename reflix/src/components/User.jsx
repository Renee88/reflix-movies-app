import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
class User extends Component {
    
    changeUser = () => {
        this.props.changeUser(this.props.userIndex)
    }

    addCatalog(){
        this.props.changeUser(this.props.userIndex)
    }

    render() {
        let color = '#' + this.props.color
        let userIndex = this.props.userIndex
        
        return (
            <Link to ={`users/${userIndex}`}><div className = "user" style = {{backgroundColor: this.props.assignColor(color,userIndex)}} onClick = {this.changeUser} >
                {this.props.name}
            </div></Link>
        );
    }
}

export default User;