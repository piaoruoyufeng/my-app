import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './views/Login';
import PrivateRoute from './components/PrivateRoute';

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<PrivateRoute page='/home' />} />
            <Route path='*' element={<Navigate to='/login' />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

