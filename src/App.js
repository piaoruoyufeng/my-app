import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './views/Login';

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to='/login' />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
};


