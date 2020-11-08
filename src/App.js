import SignupPage from './components/MainPage';
import UserPage from './components/UserPage';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {connect, Provider} from 'react-redux';
import React from "react";
import PrivateRoute from './components/PrivateRoute';
import {getUsersAction} from "./actions/user";

function App(props) {
    props.getUsers().then(() => {
        console.log('Got users');
    });

    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/signup" render={(props) => (<SignupPage {...props}/>)}/>
                    <PrivateRoute path="*" component={UserPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(getUsersAction()),
    }
};

const WrappedApp = connect(null, mapDispatchToProps)(App);

export default WrappedApp;
