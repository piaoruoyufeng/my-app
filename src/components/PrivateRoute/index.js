import React from 'react';
import Home from '../../views/Home';
import Login from '../../views/Login';

export default function PrivateRoute(props) {
    const { page, isLogin } = props;
    if (page === '/home') {
        return (
            isLogin ? <Home /> : <Login />
        )
    }
    else {
        return <Login />
    }
}


