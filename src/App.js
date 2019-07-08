import React from 'react';
import axios from 'axios';
import './App.css';
import dotenv from 'dotenv';
dotenv.config();

function App() {
// check the cookie
// if it's created, send to the DJ server for auto-login ->
// if it's not created, show the sign-up/sign-in page

const url = process.env.REACT_APP_django_server

axios.get(url, { 
  headers: { 
    'Access-Control-Allow-Origin': 'http://localhost:3000/', 
    'Access-Control-Request-Headers':'origin'
   } })
  .then(response => {

    const data = response.data;
    const isAuth = data.Authenticated;
    if(isAuth) {
      const userType = data.flag;

      if(userType === 'P') {
      console.log('render Patient view');
      }
      else {
        console.log('render Responder view');
      }
    }
    else {
      console.log('render the login/signup page');
    }



  })
  .catch(error => {
    console.log(error);
  })
  

  return (
    <main className="App">



    </main>
  );
}

export default App;
