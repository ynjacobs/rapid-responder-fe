import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ResLand = ({content}) => {
    console.log('we are hereeeeeeeeeee');
    
    let userid = sessionStorage.getItem("userid");
    console.log("userid:", userid);

    let [cases, setCases] = useState();


    useEffect(() => {
    axios({
        method:'GET',
        url: `http://localhost:8000/responders/${userid}/`,
        })
        .then(res => {
           const responder = res.data;
            const resId = responder.id;
            axios({
                method: "GET",
                url: `http://localhost:8000/cases/${resId}/get_unassign_cases/`,
            }).then(res => {
                console.log("res.data", res.data);
                const cases = res.data;
                if(cases && cases.length > 0){
                    // show the details of the case
                } else{
                    // show all cases unassigned
                    axios({
                        method: "GET",
                        url: `http://localhost:8000/cases/`,
                    }).then(res => {
                        console.log("res.data", res.data);
                        const data = res.data;
                        let newVals = [];
                        newVals = data.map((caze, index) => {
                            return (
                                <div key={index}>
                                    <h1>Help for {caze.patient.name}</h1> 
                                    <button onClick={() => {alert('thanks!')}}>accept</button>
                                </div>
                            )
                        });
                        setCases(newVals);
                        
                    })
                    .catch(err => {})
                }

            }).catch(err => {})
        })
        .catch(err => {})
    },{});
        
    return (
        <div>
            {/* <img className='' src={background_pic} alt=''/> */}
                    <h1>Welcome Responder</h1>
                    { cases }
        
        </div>
    )
}

export default ResLand;