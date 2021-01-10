import React from 'react';
import { Redirect, Route } from 'react-router-dom';


export default function ProtectedRoute({ component: Component, ...rest }) {

    const auth = false;
    const token = localStorage.getItem("userToken");

    const isAuthenticated = () => {
        console.log(token);
        console.log("Reached");
        return (token ? auth = true : auth = false);

    };


    return (
        <Route {...rest} render={props => {
            if (isAuthenticated) {
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
