import React from 'react';
import axios from 'axios';

const PatLand = () => {

    let patID = sessionStorage.getItem("userid");
    console.log("patID:", patID);

    axios({
        method: "GET",
        url: `http://localhost:8000/cases/${patID}/get_unassign_cases_pat/`
    }).then(res => {
        const data = res.data;
        console.log("data", data);
    
    }).catch(err => {})

    
    const handleHelp = (event) => {
        event.preventDefault();
        console.log("I need help!");

        let userid = sessionStorage.getItem("userid");
        console.log("userid:", userid);

// axios().then().catch(err => {})

        axios({
            method:'GET',
            url: `http://localhost:8000/patients/${userid}/`,
            })
            .then(res => {
                const patient = res.data;
                const condition = patient.conditions[0];

                console.log("patient and cond", patient.conditions[0]);
                console.log("patient cond", patient.conditions[0]);


                axios({
                    method:'POST',
                    url: `http://localhost:8000/cases/`,
                    data: {
                        patient,
                        condition,
                        description: 'init description'
                    }
                    })
                    .then(res => {
                        const patient = res.data;
                        const condition = patient.conditions[0];
        
                        console.log("patient cond", patient.conditions[0]);
                    })
                    .catch(err => {})
        


            })
            .catch(err => {})
            
        // console.log("patient cond:", patient.name);

        // const condition = patient.conditions.getItem();

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