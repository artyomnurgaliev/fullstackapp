import React from "react";
import {connect} from "react-redux";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

function PrivateRoute(props) {
  const {user, users, ...rest} = props;
  if (!user && !users.has(props.location.pathname.substring(1))) {
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
  )
}

function mapStateToProps(state) {
  const { userReducer } = state;

  return {
    user: userReducer.user,
    users: userReducer.users
  }
}

export default connect(mapStateToProps)(PrivateRoute);
