import React from 'react';
import logo from './logo.png'


const LandPage = () => {

    return (
        <div className='landpage_main'>
            {/* <img className='' src={background_pic} alt=''/> */}
            <header>
                <div className='mydiv'>
                  <img src={logo} alt=''/>  
                </div>
                <nav className='myotherdiv'>
                <a href="#">Patient</a>  | <a href="#">Responder</a> | <a href="#">Login</a>  
                </nav>
                
            </header>
            
        
        </div>
    )
}

export default LandPage;