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
        <div className='conds-div'>
        <label className='pat-label-css' key={item.pk}> {name}: 
        </label>
      <input className='conds-css' key={item.pk} type="checkbox" name='cond' value={item.pk} />
      <br/>
      
      </div>
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
  const age = form.age.value;
  const phone_number = form.phone_number.value;
  const height = form.height.value;
  const weight = form.weight.value;
  const medications = form.medications.value;
  const emer_contact_name = form.emer_contact_name.value;
  const emer_contact_number = form.emer_contact_number.value;
  const password = form.pwd.value;

  // console.log('---',   form.cond);
  // console.log('----4',   form.cond[4]);

  const nodesArray = [].slice.call(form.cond);

  let condArr = [];
  nodesArray.forEach(e => {
    if(e.checked) condArr.push(e.value);
  });


  console.log('------', condArr);

  axios({
    method: 'POST',
    url: process.env.REACT_APP_savepat,
    data: {
      uname,
      fname,
      lname,
      email,
      age,
      phone_number,
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
    console.log(err.response);
  })

}

return (
    <form method="POST" onSubmit={handlePatSignup}>
      <div className='patsign-css'>
  <label className='label-pat'>
    Username:
    </label>
    <input className='input-pat' type="text" name="uname" />
  
<br/>
  <label className='label-pat'>
    Password:
    </label>
    <input className='input-pat' type="password" name="pwd" />
  
  <br/>

  <label className='label-pat'>
    First Name:
    </label>
    <input className='input-pat' type="text" name="fname" />
  
  <br/>

  <label className='label-pat'>
    Last Name:
    </label>
    <input className='input-pat' type="text" name="lname" />
  
  <br/>

  <label className='label-pat'>
    Phone Number:
    </label>
    <input className='input-pat' type="tel" name="phone_number" />
  
  <br/>

  <label className='label-pat'>
    Age:
    </label>
    <input className='input-pat' type="number" name="age" />
  
  <br/>

  <label className='label-pat'>
    E-mail:
    </label>
    <input className='input-pat' type="email" name="email" />
 
  <br/>

  <label className='label-pat'>
    Medications:
    </label>
    <input className='input-pat' type="text" name="medications" />
  
  <br/>

  <label className='label-pat'>
    Height(in cm):
    </label>
    <input className='input-pat' type="number" name="height" />
  
  <br/>

  <label className='label-pat'>
    Weight(in lbs):
    </label>
    <input className='input-pat' type="number" name="weight" />
  
  <br/>

  <label className='label-pat'>
    Emergency Contact Name:
    </label>
    <input className='input-pat' type="text" name="emer_contact_name" />
  
  <br/>

  <label className='label-pat'>
    Emergency Contact Number:
    </label>
    <input className='input-pat' type="tel" name="emer_contact_number" />
  
  <br/>
  <label className='conds-label'>
Conditions:
</label>
<br/>
<div>
  {conds}
  </div>
  

  <input className='sub-pat' type="submit" value="Submit" />
  </div>
</form>
)

};

export default PatSignup;