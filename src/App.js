import './App.css';
import React from 'react';
import Registration from './component/registration/registration.jsx';
import Login from './component/login/login.jsx';
import ForgotPassword from './component/forgotPassword/forgotPassword.jsx';
import ResetPassword from './component/resetPassword/resetPassword.jsx';
import Dashboard from './component/dashboard/dashboard'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Switch>
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/resetPassword/:token" component={ResetPassword} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
     </BrowserRouter> 
    </div>
  );
}

export default App;
