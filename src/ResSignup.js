import React from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const ResSignup = () => {

let data;
const url = process.env.REACT_APP_qualifications
// console.log(url);
axios.get(url)
.then(res => {
  // console.log('data:->',res.data)
  data = res.data


})
.catch(err => {console.log(err)});


const handleResSignup = (event) => {
  event.preventDefault();
  console.log('form submitted');
  
}

const renderQual = () => {

  

  return (

    <select multiple name='quals'>

 {/* data.forEach( element => {
  <option value={element.id} >{element.name}</option>
}); */}

      
    </select>
  )
}

return (
    <form method="POST" onSubmit={handleResSignup}>
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

  <label>
    First Name:
    <input type="text" name="fname" />
  </label>
  <br/>

  <label>
    Last Name:
    <input type="text" name="lname" />
  </label>
  <br/>

  <label>
    Phone Number:
    <input type="tel" name="phone" />
  </label>
  <br/>

  <label>
    E-mail:
    <input type="email" name="phone" />
  </label>
  <br/>


<label>
Qualifications



</label>


  <input type="submit" value="Submit" />
</form>
)

};

export default ResSignup;