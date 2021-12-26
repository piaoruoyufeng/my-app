import React, { Component } from 'react';
import './index.scss';
import LoginForm from './LoginForm';
import Register from './RegisterForm';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { isLogin: true }
    }
    changeForm = () => {
        this.setState({ isLogin: !this.state.isLogin })
    }
    render() {
        return (
            <div>
                {this.state.isLogin ? <LoginForm changeForm={this.changeForm} /> : <Register changeForm={this.changeForm} />}
            </div>
        )
    }
}
