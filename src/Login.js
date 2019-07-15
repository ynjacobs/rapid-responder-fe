import React, {useState} from 'react';
import axios from 'axios';
import ResLand from './ResLand';
import PatLand from './PatLand';
import LandPage from './LandPage';
import dotenv from 'dotenv';

dotenv.config();

let axiosConfig = {
  withCredentials: true,
}

const Login = ({ action }) => {


  function handleLogin(event) {
    event.preventDefault();

    let form = event.target;
    const username = form.username.value;
    const password = form.pwd.value;

    axios({
      method: 'POST',
      url: process.env.REACT_APP_login,
      data: {
        username,
        password,
      },
      axiosConfig
    })
    .then(res => {
      localStorage.setItem('access-token', res.data.access)
      localStorage.setItem('refresh-token', res.data.refresh)

      // getUser(username)
      // set react-router route
    })
    .catch(err => {
      console.log("errrrwwww", err);
    })
  };

  return (
    <div>
      <form method="POST" onSubmit={handleLogin} action="/blablabla" >
        <div className='login-css'>
        <label className='label-sign'>
          Username:
          </label>
          <input className='input-sign' type="text" name="username" />
        
        <br/>
        <label className='label-sign'>
          Password:
          </label>
          <input className='input-sign' type="password" name="pwd" />
        
        
        <br/>
        </div>
        <input className='sub-log' type="submit" value="Login" />
        
      </form>
    </div>
  )

};

export default Login;