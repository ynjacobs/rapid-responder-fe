import React from 'react';
import ResLand from './ResLand';
import PatLand from './PatLand';
import Login from './Login';
import Profile from './Profile';

const LandPage = ({action, func}) => {

    console.log("I am LandPage action", action);
    console.log("I am LandPage func", func);

    switch(action) {
        case "login":
            return ( <div> <Login action={action} func={func} /></div>)
        case "pat_landpage":
            return (<div> <PatLand /></div>)
        case "res_landpage":
            return (<div> <ResLand /> </div>)
        case "profile":
            return (<div> <Profile /> </div>)
        default:
            return null;
    }

}

export default LandPage;