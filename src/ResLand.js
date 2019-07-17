import React, {useState, useEffect} from 'react';
import axios from 'axios';

class ResLand extends React.Component {

    
    constructor(props) {
        super(props);
        console.log('in ResLand constructor');

        this.responder = "bla bla";
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
                this.responder = res.data;
                const resId = this.responder.id;
                axios({
                    method: "GET",
                    url: `http://localhost:8000/cases/${resId}/ongoing/`,
                }).then(res => {
                    console.log("res.data", res.data);
                    const caze = res.data.case;
                    if(caze){
                        let casesNewVal;
                        casesNewVal = (<h2> Please go help <div className='pat-name'>{caze.patient.name} </div> <br/>
                        <br/>At: {caze.patient.address}  <br/>
                         <br/>
                          {caze.condition.name} <br/> <br/>
                         Requested help at {new Date(caze.creation_date).toLocaleTimeString()}</h2>
                        );
                        this.setState({cases: casesNewVal});
                    } else {
                        // show all cases unassigned
                        axios({
                            method: "GET",
                            url: `http://localhost:8000/cases/unassigned/`,
                        }).then(res => {
                            console.log("unassigned cases=> res.data", res.data);
                            const cases = res.data.cases;
                            let newVals = [];
                            if(cases && cases.length > 0){
                                newVals = cases.map((caze, index) => {
                                    return (
                                        <div key={index}>
                                            <h2>Help <div className='pat-name'>{caze.patient.name}</div> with {caze.condition.name}?</h2> 
                                            <button className='accept' key={caze.id} onClick={(event) => this.handleAcceptMission(event, caze.id)}>accept</button>
                                        </div>
                                    )
                                });
                            } else {
                                newVals = <h1>No Urgent cases, you may relax!</h1>;
                            }
                           
                            this.setState({cases: newVals});
                            // console.log("cases", this.state.cases)
                            
                        }).catch(err => {console.log("err::", err)})
                    }
                }).catch(err => {console.log("err::", err)})
            }).catch(err => {console.log("err::", err)})

    
      }

    acceptClicked = function(event, caseID){
        console.log("mission accepted", caseID);
        this.props.handler(event, caseID);
    }

    handleAcceptMission(event, caseID) {
        event.preventDefault();
        console.log("handleAcceptMission in ResLand", caseID);
        const userID = sessionStorage.getItem("userid");
      
        axios({
          method: 'PUT',
          url: `http://localhost:8000/cases/${caseID}/`,
          data: {
            "res_id": userID,
          }
        })
        .then(res => {
            console.log("from handleAcceptMission res.data: ", res.data);
            const caze = res.data.case;
            let casesNewVal;
        casesNewVal = (
        <h1> 
            Run now to help {caze.patient.name} at address: {caze.patient.address}, 
            this person suffers from {caze.condition.name} and requested help on {caze.creation_date}
        </h1>);
            this.setState({cases: casesNewVal});
            })
        .catch(err => {
          console.log("from handleAcceptMission error", err);
        })
      
      
      }

    render()
    {
        return (
            <div>
                {/* <img className='' src={background_pic} alt=''/> */}
                        <h1 className='res-welocme'>Welcome {this.responder.name}  </h1>
                        {this.state.cases }
            </div>
        )
    }

}



        

export default ResLand;