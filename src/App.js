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

function Index() {
return null;
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


const App = () => {
  const url = process.env.REACT_APP_django_refresh

  const [func, setFunc] = useState();
  const [action, setAction] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
      const accessToken = localStorage.getItem('access-token')
      const refreshToken = localStorage.getItem('refresh-token')
      if (refreshToken) {
        axios({
            method: 'POST',
            url: process.env.REACT_APP_django_refresh,
            data: {
              refresh: refreshToken,             
          }
        }).then(response => {
          // setState
          console.log("Axios get user info:", response.data)
        })
        .catch(error => {
            console.log('error', error);
        });
      } else {
          console.log("in else render Log()");
          setAction('login');
          // setFunc(() => { return handleLogin });
      }
  }, {});


  function getUser(username) {
    axios({
      method: 'POST',
      url: "http://localhost:8000/users/get_by/",
      data: {
        username,
      }
    }).then(res => {
      setUser(res.data.user)

      if(user.profile.flag === 'P'){
        setAction('pat_landpage');
      } else {
        setAction('res_landpage');
      }
    })
  }

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
                  <Route path="/login/"
                         render={(routeProps) => (
                            <Log {...routeProps} func={func} />
                        )} 
                   />
                  <Route path="/profile/" component={Prof} />
              </Router>
              <LandPage />
          </div>
      </main>
      
  )
}


export default App;