import React, {useState} from 'react';
import axios from 'axios';
import ResLand from './ResLand';
import PatLand from './PatLand';
import LandPage from './LandPage';
import Login from './Login';
import dotenv from 'dotenv';

dotenv.config();

const ResProfile = ({action, func}) => {

  
  console.log("I am Profile action", action);
  console.log("I am Profile func", func);
  
  const accessToken = localStorage.getItem('access-token');
  const refreshToken = localStorage.getItem('refresh-token');


  axios({
    method: 'POST',
    url: "http://localhost:8000/patients/get_p/",
    headers: {
      Authorization: `Bearer ${accessToken}`,          
    }})
    .then(response => {
      console.log(response);
    })


return (
  <div>
  <label>
    username
  </label>
<br/>
  <label>
    First Name
  </label>
  <br/>




</div>
)

};

export default ResProfile;