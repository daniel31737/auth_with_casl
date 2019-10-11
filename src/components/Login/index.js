import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            username: '',
            password: '',
            currentUser: ''
        }
    }

    getUsername = (e) => {
        const username = e.target.value;
        this.setState({ username });
    }

    getPassword = (e) => {
        const password = e.target.value;
        this.setState({ password });
    }

    checkLogin = () => {
        const { username, password, users } = this.state;
        if (users === null || users === "") {
            alert("Something wrong!");
        } else {
            let checkExist = users.find(user => {
                if (user.username === username && user.password === password) {
                    return user;
                }
                return false;
            })
            if (!checkExist) {
                alert("Something wrong!");
            } else {
                this.setState({ currentUser: checkExist })
                window.location.replace('/products');
            }
        }
    }

    componentDidMount() {
        let checkExist = localStorage.getItem('users');
        let users = checkExist ? JSON.parse(checkExist) : '';

        this.setState({ users });
    }

    componentDidUpdate() {
        localStorage.setItem('currentUser', JSON.stringify(this.state.currentUser));
    }

    render() {
        return (
            <div className="form">
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" onChange={this.getUsername} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="text" id="password" onChange={this.getPassword} />
                </div>
                <div className="form-group">
                    <button onClick={this.checkLogin}>Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        )
    }
}