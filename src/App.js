import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './style.scss';

const Login = React.lazy(() => import('./components/Login'))
const Register = React.lazy(() => import('./components/Register'));
const Products = React.lazy(() => import('./components/Products'));

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            currentUser: "",
            isShow: false
        }
    }

    onClickLogout = () => {
        localStorage.removeItem('currentUser');
        window.location.replace('/');
    }

    componentDidMount() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.setState({ currentUser });
        if(currentUser === null || currentUser === "") {
            this.setState({ isShow: false });
        } else {
            this.setState({ isShow: true });
        }
    }

    render() {
        const { currentUser, isShow } = this.state;
        return (
            <div className="container">
                <div className="header">
                    <div className="breadcrumb">
                        <div style={{ display: isShow ? 'block' : 'none' }} className="account">
                            <span>Hello, {(currentUser === null) ? '' : currentUser.username }</span>
                            <button type="button" onClick={this.onClickLogout}>Logout</button>
                        </div>
                    </div>
                    <div className="main">
                        <Router>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Switch>
                                    <Route exact={true} path="/" component={Login} />
                                    <Route exact={false} path="/register" component={Register} />
                                    <Route exact={false} path="/products" component={Products} />
                                </Switch>
                            </Suspense>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
