import { useState } from 'react'
import React from 'react'

import {
  BrowserRouter as Router, 
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/Signup';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/dashboard' element={<Home/>}></Route>
          <Route path='/income' element={<Income/>}></Route>
          <Route path='/expense' element={<Expense/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

const Root = ()=>{
  const isAuthenticated =!!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard"/>

  ):(
    <Navigate to = "/login"/>
  ) 
}

export default App
