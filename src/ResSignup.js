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
      const name = item.name;
      return (
        <div className='quals-div'>
        <label className='res-label-css' key={item.pk}> {name}: 
        </label>
      <input className='qual-css' key={item.pk} type="checkbox" name='qual' value={item.pk} />
      <br/>
      </div>
      
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
    url: process.env.REACT_APP_saveres,
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
    <form className='res-css' method="POST" onSubmit={handleResSignup}>
  <label className='res-label'>
    Username:
  </label>

    <input className='input-res' type="text" name="uname" />
<br/>
  <label className='res-label'>
    Password:
  </label>

    <input className='input-res' type="password" name="pwd" />
  <br/>

  <label className='res-label'>
    First Name:
  </label>

    <input className='input-res' type="text" name="fname" />
  <br/>

  <label className='res-label'>
    Last Name:
  </label>

    <input className='input-res' type="text" name="lname" />
  <br/>

  <label className='res-label'>
    Phone Number:
  </label>

    <input className='input-res' type="tel" name="phone" />
  <br/>

  <label className='res-label'>
    E-mail:
  </label>

    <input className='input-res' type="email" name="email" />
  <br/>

  <label className='quals-label'>
Qualifications:
</label>
<br/>
  {quals}


  <input className='sub-res' type="submit" value="Submit" />
</form>
)

};

export default ResSignup;