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

const Login = ({handleLogin}) => {


  function submitForm(event) {
    console.log("in submitForm");
    event.preventDefault();
    handleLogin(event);
  };

  return (
    <div>
      <form method="POST" onSubmit={submitForm} action="/blablabla" >
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