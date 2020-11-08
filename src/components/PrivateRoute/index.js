import React from "react";
import {connect} from "react-redux";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {getUsersAction, loginAction, signupAction} from "../../actions/user";
import {withRouter} from "react-router";

function PrivateRoute(props) {
    console.log('In Router');
    const {user, users, loading, ...rest} = props;
    if (loading) {
        return (<h1>LOADING...</h1>);
    }
    console.log('user', user);
    console.log('users', users);
    console.log('path', props.location.pathname);
    if (!user && (!users || !users.has(props.location.pathname.substring(1)))) {
        return <Redirect
            to={{
                pathname: '/signup',
            }}
        />
    }

    return (
        <Route
            {...rest}
        />
    );
}

function mapStateToProps(state) {
    const {userReducer} = state;

    return {
        user: userReducer.user,
        users: userReducer.users,
        loading: userReducer.isFetching,
    }
}


export default withRouter(connect(mapStateToProps)(PrivateRoute));

