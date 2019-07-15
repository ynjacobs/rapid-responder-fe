import React from 'react';
import ResLand from './ResLand';
import PatLand from './PatLand';
import Login from './Login';
import ResProfile from './ResProfile';

const LandPage = () => {

   return (
       <div >
           <div className='grid-land'>
           <main className='para'>
    <h1>Welcome to Rapid Responder</h1>
    <p>where patients with pre-existing conditions <br/> can recieve supprt
        from responders during long ambulance arrival times
    </p>
    </main>
    <button className='res-button'>Responder Sign Up</button>
    <button className='pat-button'>Patient Sign Up</button>
    </div>
    
    <Login />
    
    </div>
   );
}

export default LandPage;