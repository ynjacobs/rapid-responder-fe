import React from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const Login = () => {

  let axiosConfig = {
    withCredentials: true,
  }
  

const handleLogin = (event) => {
  event.preventDefault();
  console.log('form submitted');
  const form = event.target;
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
    console.log('res.tokenddd:::::', res.data.access);
    localStorage.setItem('access-token', res.data.access)
    localStorage.setItem('refresh-token', res.data.refresh)


    console.log('tokenssssss', localStorage.getItem('token'));
  })
  .catch(err => {
    console.log(err);
  })
  .then(res => {
    axios({
      method: 'POST',
      url: "http://localhost:8000/users/get_by/",
      data:{
        username,
      }
    })
    .then(res => {
      const user = res.data['user']
      const flag = user.profile.flag;
      if(flag === 'P'){
        console.log("render patient land page");
      }
      else{
        console.log("render responder land page");
      }

      
    })
  })

}

return (
    <form method="POST" onSubmit={handleLogin}>
  <label>
    Username:
    <input type="text" name="username" />
  </label>
<br/>
  <label>
    Password:
    <input type="password" name="pwd" />
  </label>
  <br/>


  <input type="submit" value="Submit" />
</form>
)

};

export default Login;