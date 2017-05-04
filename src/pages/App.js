import React, {Component} from 'react'
import {Link} from "react-router";
import auth from '../authorization/auth'
import {observer} from "mobx-react";

//import {useStrict} from "../stores/useStrict"

const App = observer(class App extends Component {

    render() {
        const logInStatus = auth.loggedIn ? "Logged in as: " + auth.userName : "";
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">FlookUp</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/home">Home</Link></li>
                            {auth.isUser ? <li><Link to="/user"> User demo </Link></li> : null}
                            {auth.isAdmin ? <li><Link to="/admin"> Admin demo </Link></li> : null}
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="navbar-text" style={{color: "steelBlue"}}>{logInStatus}</li>
                            <li>
                                {auth.loggedIn ?
                                    (
                                        <Link to="/logout"><span className="glyphicon glyphicon-log-in"/>
                                            Logout</Link>
                                    ) :
                                    (
                                        <Link to="/login">
                                            <span className="glyphicon glyphicon-log-out"/> Login </Link>
                                    )}
                            </li>
                        </ul>
                    </div>
                </nav>
                {this.props.children || <p>You are {!auth.loggedIn && 'not'} logged in.</p>}
            </div>
        )
    }
})

export default App;