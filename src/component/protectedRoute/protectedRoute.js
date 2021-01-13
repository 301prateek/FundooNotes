import React from 'react';
import { Redirect, Route } from 'react-router-dom';


export default function ProtectedRoute({ component: Component, ...rest }) {

    // const token = ;

    const isAuthenticated = () => {
        if(localStorage.getItem("userToken") === null){
            return false;
            console.log("false");
        }else{
            return true;
            console.log("true");
        }
    };


    return (
        <Route {...rest} render={props => {
            if (isAuthenticated()) {
                console.log("authenticated");
                return <Component {...props} />;
            }
            else {
                console.log("exit");
                return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            }
        }
        } />
    );
}
