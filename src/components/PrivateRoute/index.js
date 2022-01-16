import React from 'react';
import Home from '../../views/Home';
import Login from '../../views/Login';
import { getToken } from '../../utils/session';

export default function PrivateRoute(props) {
    const { page } = props;
    if (getToken() && page === '/home') {
        return <Home />
    }
    else {
        return <Login />
    }
}


