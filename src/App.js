import SignupPage from './components/MainPage';
import UserPage from './components/UserPage';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {connect, Provider} from 'react-redux';
import React from "react";
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/signup" render={(props) => (<SignupPage {...props}/>)} />
            <PrivateRoute path="*" component={UserPage}/>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

const WrappedApp = connect()(App);

export default WrappedApp;
