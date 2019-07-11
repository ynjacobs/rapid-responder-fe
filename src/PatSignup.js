import React, {useState, useEffect} from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PatSignup = () => {

  let axiosConfig = {
    withCredentials: true,
  }
  
let data;
// let quals;
const url = process.env.REACT_APP_conditions
// console.log(url);

let [conds, setConds] = useState([]);

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
      <input key={item.pk} type="checkbox" name='cond' value={item.pk} />
      <br/>
      </label>
      )
    }); 
    
    setConds(newVals); 
    // setQuals(['a','b']); 
    
    console.log('->',conds);
  })
  .catch(err => {console.log(err)});
}, {});

const handlePatSignup = (event) => {
  event.preventDefault();
  console.log('form submitted');
  const form = event.target;
  const uname = form.uname.value;
  const fname = form.fname.value;
  const lname = form.lname.value;
  const email = form.email.value;
  const phone = form.phone.value;
  const height = form.height.value;
  const weight = form.weight.value;
  const medications = form.medications.value;
  const emer_contact_name = form.emer_contact_name.value;
  const emer_contact_number = form.emer_contact_number.value;
  const password = form.pwd.value;

  console.log('---',   form.cond);
  console.log('----4',   form.cond[4]);

  const nodesArray = [].slice.call(form.cond);

  let condArr = [];
  nodesArray.forEach(e => {
    if(e.checked) condArr.push(e.value);
  });


  console.log('------', condArr);

  axios({
    method: 'post',
    url: process.env.REACT_APP_savepat,
    data: {
      uname,
      fname,
      lname,
      email,
      phone,
      password,
      height,
      weight,
      medications,
      emer_contact_name,
      emer_contact_number,
      conds : condArr
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
    <form method="POST" onSubmit={handlePatSignup}>
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

  <label>
    Medications:
    <input type="text" name="medications" />
  </label>
  <br/>

  <label>
    Height(in cm):
    <input type="number" name="height" />
  </label>
  <br/>

  <label>
    Weight(in lbs):
    <input type="number" name="weight" />
  </label>
  <br/>

  <label>
    Emergency Contact Name:
    <input type="text" name="emer_contact_name" />
  </label>
  <br/>

  <label>
    Emergency Contact Number:
    <input type="tel" name="emer_contact_number" />
  </label>
  <br/>

Conditions
<br/>
  {conds}


  <input type="submit" value="Submit" />
</form>
)

};

export default PatSignup;