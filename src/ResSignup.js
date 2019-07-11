import React, {useState, useEffect} from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const ResSignup = () => {

  let axiosConfig = {
    withCredentials: true,
  }
  
let data;
// let quals;
const url = process.env.REACT_APP_qualifications
// console.log(url);

let [quals, setQuals] = useState([]);

useEffect(() => {
  axios.get(url)
  .then(res => {
    data = JSON.parse(res.data); 
    console.log('data:->',res.data)
  
    let newVals = []
    newVals = data.map((item) => {
      const name = item.fields.name;
      return (
        <label key={item.pk}> {name}: 
      <input key={item.pk} type="checkbox" name='qual' value={item.pk} />
      <br/>
      </label>
      )
    }); 
    
    setQuals(newVals); 
    // setQuals(['a','b']); 
    
    console.log('->',quals);
  })
  .catch(err => {console.log(err)});
}, {});

const handleResSignup = (event) => {
  event.preventDefault();
  console.log('form submitted');
  const form = event.target;
  const uname = form.uname.value;
  const fname = form.fname.value;
  const lname = form.lname.value;
  const email = form.email.value;
  const phone = form.phone.value;
  const password = form.pwd.value;

  console.log('---',   form.qual);
  console.log('----4',   form.qual[4]);

  const nodesArray = [].slice.call(form.qual);

  let qualArr = [];
  nodesArray.forEach(e => {
    if(e.checked) qualArr.push(e.value);
  });


  console.log('------', qualArr);

  axios({
    method: 'post',
    url: 'http://localhost:8000/responders/',
    data: {
      uname,
      fname,
      lname,
      email,
      phone,
      password,
      quals : qualArr
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
    <input type="email" name="email" />
  </label>
  <br/>


Qualifications
<br/>
  {quals}


  <input type="submit" value="Submit" />
</form>
)

};

export default ResSignup;