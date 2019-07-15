import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router,Redirect, Route, Link } from "react-router-dom";
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

function whichLandPage(action){
switch(action){
  case 'user':
    return <PatLand />;
    break;
  case 'guest':
    return <LandPage />;
    break;
  default:
    return <h1 />;

}
}

function Index() {
return <LandPage />;
}

function Patient() {
  return <PatSignup />
}

function Responder() {
    return <ResSignup />
}

function Log() {
    return <Login />
}

function Prof(){
    return <ResProfile />
}

class App extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      action: null,
      user: null,
    };

    this.getTokens();

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
        // console.log("acesssssssss::::", accessToken);
        this.getUser(accessToken);

      })
      .catch(error => {
          console.log('error', error);
      });
    } 
    else {
        console.log("in else render Log()");
        this.setState.action = 'guest';
        // setFunc(() => { return handleLogin });
    }

  }



/* */
  getUser(accessToken) {
    // const accessToken = localStorage.getItem('access-token');
    console.log("accessToken", accessToken)
    axios({
      method: 'PUT',
      url: "http://localhost:8000/users/get_user/",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    .then(response => {
      console.log("dddd::::", response.data)
      // console.log("dddd::::", res.)
      this.setState.action = 'patient';
      /*
      setUser(res.data.user)

      if(user.profile.flag === 'P'){
        setAction('pat_landpage');
      } else {
        setAction('res_landpage');
      }
      */
    })
  }
/**/

  render() {

    const landPage = whichLandPage(this.state.action);
  return (
      <main className="App">
          <div className="landpage_main">
              <Router>
                  <header className="header">
                      <div className='mydiv'>
                          <Link to="/">
                              <img src = { logo } alt = '' />
                          </Link>
                      </div>
                      {/* <nav className='myotherdiv'>
                          <Link to="/patient/">Patients</Link> |  
                          <Link to="/responder/">Responders</Link> |  
                          <Link to="/login/">Login</Link> |
                          <Link to="/profile/">Profile</Link>
                      </nav> */}
                  </header>

                  <Route path="/" exact component={Index} />
                  <Route path="/patient/" component={Patient} />
                  <Route path="/responder/" component={Responder} />
                  <Route path="/login/" component={Log} 

                   />
                  <Route path="/profile/" component={Prof} />
              </Router>
              {/* <LandPage /> */}
          </div>
          {landPage}
      </main>
      
  )}
}


export default App;


// ======================================
