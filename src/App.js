import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Link } from "react-router-dom";
import axios from 'axios';
import './App.css';
// import LandPage from './LandPage';
import ResSignup from './ResSignup';
import PatSignup from './PatSignup';
import Login from './Login';
import logo from './logo.png';
import dotenv from 'dotenv';
import ResProfile from './ResProfile';

import ResLand from './ResLand';
import PatLand from './PatLand';
import LandPage from './LandPage';

dotenv.config();

let axiosConfig = {
    withCredentials: true,
  }

class App extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      action: 'guest',
      user: null,
    };

    this.getTokens();
    this.handleLogin = this.handleLogin.bind(this);

  }

  whichLandPage(action){
    console.log("in whichLandPage for:", action);
    switch(action){
      case 'guest':
        return <LandPage handler={this.handleLogin} />;
      case 'patient':
        return <PatLand />;
      case 'responder':
        return <ResLand />;
      default:
        return null;
    }
  }

  handleLogin(event) {

    console.log("in handleLogin in App", event);

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
      localStorage.setItem('access-token', res.data.access);
      localStorage.setItem('refresh-token', res.data.refresh);
      console.log("-->", res.data.access);
      this.getUser(res.data.access);
    })
    .catch(err => {
      console.log("errrrwwww", err);
    })
  }
  

  getTokens() {
    
console.log('in getTokens function');
    const refreshToken = localStorage.getItem('refresh-token');
    
    if (refreshToken) {
      axios({
        method: 'POST',
        url: process.env.REACT_APP_django_refresh,
        data: {
          refresh: refreshToken,             
        }
      })
      .then(response => {
        console.log("should call getUser", response.data)
        const accessToken = response.data.access? response.data.access: null;
        this.setState.action = 'user';
        this.getUser(accessToken);

      })
      .catch(error => {
          console.log('error', error);
      });
    } 
    else {
        console.log("in else render Log()");
        this.setState.action = 'guest';
    }

  }

/* */
  getUser(accessToken) {
    // const accessToken = localStorage.getItem('access-token');
    console.log("accessToken:", accessToken)
    axios({
      method: 'GET',
      url: "http://localhost:8000/user-auth/",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    .then(response => {
      const user = response.data.user;
      console.log("User:", user);
      const userType = user.profile.flag;
      console.log("I am:", userType, "kind of user");

      sessionStorage.setItem("user", user);

      if(userType === 'R'){
        this.setState.action = 'responder';
      }else {
        this.setState.action = 'patient';
      }
    })
  }
/**/

renderRedirect() {
  switch(this.state.action) {
    case 'responder':
      return <Redirect to="/responder" />
    case 'patient':
      return <Redirect to="/patient" />
    case '':
      return <Redirect to="/" />
  }

}

  render() {
    // const landPage = this.whichLandPage(this.state.action);
  return (
      <main className="App">
        <div className="landpage_main">
          <header className="header">
            <div className='mydiv'>
              <img src = { logo } alt = '' />
            </div>
          </header>
        </div>
        {this.renderRedirect()}
      </main>
      
  )}
}

export default App;


// ======================================
