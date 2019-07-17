import React, {useState, useEffect} from 'react';
import axios from 'axios';

class PatLand extends React.Component {

    constructor(props) {
        super(props);
        console.log('in PatLand constructor');

        this.patient = "null";
        this.state = {
            content: null,
        };
 
        let patID = sessionStorage.getItem("userid");
        console.log("patID:", patID);

        axios({
            method:'GET',
            url: `http://localhost:8000/patients/${patID}/`,
        })
        .then(res => {
            this.patient = res.data;
            patID = this.patient.id;

            axios({
                method: "GET",
                url: `http://localhost:8000/cases/${patID}/get_unassign_cases_pat/`
            }).then(res => {
                const data = res.data;
                const caze = data.case;
                console.log("get_unassign_cases_pat==> data", data.case);
                
                if(caze) {
                    // setInterval to check for assignment
                    console.log("I have a case");
                    let newVal;
                    if(caze.status === 'UN'){
                        newVal = (
                            <div>
                                <h1>You have called for help, enjoy the little time you have!</h1>
                                <h2>{caze.description}</h2>
                                <h2>{caze.patient.name} with {caze.condition["name"]}</h2>
                            </div>
                        );
                    } else {
                        newVal = (
                            <div>
                                <h1>You have called for help</h1>
                                <h2>{caze.responder.name} is coming to help with {caze.condition["name"]} </h2>
                            </div>
                        );
                    }
                    this.setState({content: newVal})
    
                } else {
                    console.log("I DON'T have cases :D ")
                    let newVal = (
                        <div>
                            <button className='button' onClick={this.handleHelp}>Emergency</button>
                        </div>
                        );
                    this.setState({content: newVal})

                }}).catch(err => {console.log("error:", err)})
            }).catch(err => {console.log("error:", err)})
    }


    handleHelp = (event) => {
        event.preventDefault();
        console.log("I need help!");

        let userid = sessionStorage.getItem("userid");
        console.log("userid:", userid);

        axios({
            method:'GET',
            url: `http://localhost:8000/patients/${userid}/`,
            })
            .then(res => {
                const patient = res.data;
                const condition = patient.conditions[0];

                axios({
                    method:'POST',
                    url: `http://localhost:8000/cases/`,
                    data: {
                        patient,
                        condition,
                        description: 'new case'
                    }
                    })
                    .then(res => {
                        const caze = res.data.case;

                        let newVal = (
                            <div>
                                <h1>Help will be here soon!</h1>
                                <h2>Condition: {caze.condition.name}</h2>
                            </div>
                        );
                        this.setState({content: newVal});
                    })
                    .catch(err => {console.log("error:", err)})
            })
            .catch(err => {console.log("error:", err)})
            
        // console.log("patient cond:", patient.name);

        // const condition = patient.conditions.getItem();

    }


    render(){
        return (
            <>
            <h1 className='pat-welcome'>Welcome {this.patient.name}</h1>
            <div>{this.state.content}</div>
            </>
    
        )
    }
}


export default PatLand;