import React from "react";
import {connect} from "react-redux";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import {withRouter} from "react-router";

function PrivateRoute(props) {
    const {user, loading, ...rest} = props;
    if (loading) {
        return (<h1>LOADING...</h1>);
    }
    if (!user) {
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
        loading: userReducer.isFetching,
    }
}


export default withRouter(connect(mapStateToProps)(PrivateRoute));

