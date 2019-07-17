import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PatLand = () => {

    let patID = sessionStorage.getItem("userid");
    console.log("patID:", patID);

    let [content, setContent] = useState();

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/cases/${patID}/get_unassign_cases_pat/`
        }).then(res => {
            const data = res.data;
            const caze = data.case;
            console.log("get_unassign_cases_pat==> data", data.case);

            if(caze) {
                // message for searching for help
                // setInterval to check for assignment
                console.log("I have a case");

                setContent(() => {
                    return (
                        <div>
                            <h1>You have called for help, it's on the way or else!</h1>
                            <h2>{caze.description}</h2>
                            <h2>{caze.patient.name} with {caze.condition["name"]}</h2>
                        </div>
                        )
                });

            } else {
                console.log("I DON'T have cases :D ")
                setContent(() => {
                    return (
                        <div>
                            <h1>Welcome Patient</h1>
                            <button className='button' onClick={handleHelp}>Emergency</button>
                        </div>
                        )
                });
            }
        }).catch(err => {})
    },{});

    
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
        <div>{content}</div>
        

    )
}

export default PatLand;