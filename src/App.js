import SignupPage from './components/InitPage';
import UserPage from './components/UserPage';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {connect, Provider} from 'react-redux';
import React from "react";
import PrivateRoute from './components/PrivateRoute';
import {getUserAction} from "./actions/user";

function App(props) {
    if (!props.user) {
        console.log('trying to get user');
        let login = window.location.pathname.substring(1);
        props.getUser(login).then(() => {
            console.log('Got user');
        }).catch((error) => {});
    }

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

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (login) => dispatch(getUserAction(login)),
    }
};

const WrappedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default WrappedApp;
