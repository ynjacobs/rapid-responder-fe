import React, {useState, useEffect} from 'react';
import axios from 'axios';

class ResLand extends React.Component {
    constructor(props) {
        super(props);
        console.log('in ResLand constructor');
      
        this.state = {
            cases: null,
        };
    
        let userid = sessionStorage.getItem("userid");
        console.log("userid:", userid);
    
   
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
                                        <button key={caze.id} onClick={(event) => this.acceptClicked(event, caze.id)}>accept</button>
                                    </div>
                                )
                            });
                            this.setState({cases: newVals});
                            console.log("cases", this.state.cases)
                            
                        })
                        .catch(err => {})
                    }
    
                }).catch(err => {})
            })
            .catch(err => {})

    
      }

    acceptClicked = function(event, caseID){
        event.preventDefault();
        console.log("mission accepted", caseID);
        this.props.handler(event, caseID);
    }


    render()
    {
        return (
            <div>
                {/* <img className='' src={background_pic} alt=''/> */}
                        <h1>Welcome Responder</h1>
                        {this.state.cases }
            </div>
        )
    }

}



        

export default ResLand;