import React from 'react';
import axios from 'axios';
import './App.css';
import LandPage from './LandPage';
import dotenv from 'dotenv';
dotenv.config();

function App() {
// check the cookie
// if it's created, send to the DJ server for auto-login ->
// if it's not created, show the sign-up/sign-in page

let content;

const url = process.env.REACT_APP_django_server
// const url = "http://localhost:8000/home/"

axios.get(url/*, { 
  headers: { 
    'Access-Control-Allow-Origin': '*'
  
   } }*/)
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
      content = (
<LandPage />
      );
    }



  })
  .catch(error => {
    console.log(error);
  })
  

  return (
    <main className="App">

          {content}
          <LandPage/>


    </main>
  );
}


export default App;
