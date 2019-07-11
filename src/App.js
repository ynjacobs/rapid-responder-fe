import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import './App.css';
import LandPage from './LandPage';
import ResSignup from './ResSignup';
import PatSignup from './PatSignup';
import Login from './Login';
import logo from './logo.png';
import dotenv from 'dotenv';
dotenv.config();

// const Content = ({user}) => {
//     console.log("User:", user)
//     // const isAuth = user.Authenticated;
//     // const userType = user.flag;
//     if (user.Authenticated) {
//         return <LandPage/>
//     } else {
//         return <div><h1>Unauthenicated</h1></div> 
//     }
// }

function Index() {
  return (
    <div>

    </div>
  )
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


const Responders = () => {
    return (
        <div>
            <h1>Responders</h1>
        </div>
    )
}




const App = () => {
    const url = process.env.REACT_APP_django_refresh
    // const url = "http://localhost:8000/home/"

    // check the cookie
    // if it's created, send to the DJ server for auto-login ->
    // if it's not created, show the sign-up/sign-in page

    const [user, setUser] = useState({});

    useEffect(() => {
        const accessToken = localStorage.getItem('access-token')
        const refreshToken = localStorage.getItem('refresh-token')
        if (refreshToken)
        {
            axios({
                method: 'POST',
                url: process.env.REACT_APP_django_refresh,
                data: {
                  refresh: refreshToken,             
                }})
                .then(response => {
                    // setUser(response.data)
                    console.log("Axios get user info:", response.data)
                })
                .catch(error => {
                    console.log('error', error);
                })    
        }
        else{
            console.log("in else render Log()");

            Log();
        }
        
    }, {});


    return (
        <main className = "App" >
            <div className = "landpage_main" >

                    <Router>
                        <header className = "header" >
                            <div className = 'mydiv' >
                                <Link to="/">
                                    <img src = { logo } alt = '' />
                                </Link>
                            </div>
                            <nav className='myotherdiv'>

                                <Link to="/patient/">Patients</Link> |  
                    
                                <Link to="/responder/">Responders</Link> |  
                                <Link to="/login/">Login</Link> 
                            </nav>
                        </header>

                        <Route path="/" exact component={Index} />
                        <Route path="/patient/" component={Patient} />
                        <Route path="/responder/" component={Responder} />
                        <Route path="/login/" component={Log} />
                    </Router>


                {/* <header className = "header" > */}
                    {/* <div className = 'mydiv' >
                        <img src = { logo } alt = '' />
                    </div> */}
                    {/* <nav className='myotherdiv' >
                        <a href = "#" > Patient </a>  | <a href="#" onClick={helloWorld}> Responder</a> | <a href = "#" > Login </a>  
                    </nav> */}
                {/* </header> */}

            </div>


        </main>
        
    )
}


export default App;