import React from "react";
import {connect} from "react-redux";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import {withRouter} from "react-router";

function PrivateRoute(props) {
    const {user, loading, ...rest} = props;
    console.log("in private route")
    console.log("loading", loading)
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
    return {
        user: state.userReducer.user,
        loading: state.userReducer.isFetching,
    }
}


export default withRouter(connect(mapStateToProps)(PrivateRoute));

