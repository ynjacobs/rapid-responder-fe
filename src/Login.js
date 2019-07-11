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
  const uname = form.uname.value;
  const password = form.pwd.value;



  axios({
    method: 'post',
    url: process.env.REACT_APP_login,
    data: {
      uname,
      password,
     
    },
    axiosConfig
  })
  .then(res => {
    console.log(res.data);
    console.log('cookies', res.headers);
  })
  .catch(err => {
    console.log(err);
  })

}

return (
    <form method="POST" onSubmit={handleLogin}>
  <label>
    Username:
    <input type="text" name="uname" />
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