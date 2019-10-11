import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    username: 'thao',
                    password: '123'
                }
            ],
            username: '',
            password: ''
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

    registerAccount = () => {
        const { username, password, users } = this.state;
        const user = {
            username: username,
            password: password,
            role: 1
        }
        if (users === null || users === "") {
            this.setState({
                users: [...users, user],
                username: '',
                password: ''
            })
            alert("Register success!");
            window.location.replace('/');
        } else {
            if (users.some(user => user.username === username)) {
                alert("Account is exist");
            } else {
                this.setState({
                    users: [...users, user],
                    username: '',
                    password: ''
                })
                alert("Register success!");
                window.location.replace('/');
            }
        }
    }

    componentDidMount() {
        let checkExist = localStorage.getItem('users');
        let users = checkExist ? JSON.parse(checkExist) : '';
        this.setState({ users });
    }

    componentDidUpdate() {
        localStorage.setItem('users', JSON.stringify(this.state.users));
    }

    render() {
        return (
            <div className="form" >
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" onChange={this.getUsername} value={this.state.username} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="text" id="password" onChange={this.getPassword} value={this.state.password} />
                </div>
                <div className="form-group">
                    <button onClick={this.registerAccount}>Register</button>
                    <Link to="/">Login</Link>
                </div>
            </div>
        )
    }
}
