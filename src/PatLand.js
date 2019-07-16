import React from 'react';
import axios from 'axios';

const PatLand = () => {

    const handleHelp = (event) => {
        event.preventDefault();
        console.log("I need help!");

        const patient = sessionStorage.getItem("user");
        const condition = patient.conditions[0]

        axios({
method:'POST',
url: 'http://localhost:8000/cases/',
data: {

}
        })
        .then(res => {})
        .catch(err => {})



    }

    return (
        <div>
            {/* <img className='' src={background_pic} alt=''/> */}
                        
        <h1>Welcome Patient</h1>
        <button className='button' onClick={handleHelp}>Emergency</button>

        </div>
    )
}

export default PatLand;