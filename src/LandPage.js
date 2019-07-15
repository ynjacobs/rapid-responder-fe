import React from 'react';
import ResLand from './ResLand';
import PatLand from './PatLand';
import Login from './Login';
import ResProfile from './ResProfile';

const LandPage = () => {

   return (
       <div>
           <main className='para'>
    <h1>Welcome to Rapid Responder</h1>
    <p>where patients with pre-existing conditions <br/> can recieve supprt
        from responders during long ambulance arrival times
    </p>
    </main>
    
    <Login />
    
    </div>
   );
}

export default LandPage;