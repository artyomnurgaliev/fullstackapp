import InitPage from './components/InitPage';
import UserPage from './components/UserPage';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {connect, Provider} from 'react-redux';
import React from "react";
import PrivateRoute from './components/PrivateRoute';
import {getUserAction} from "./actions/user";
import {withCookies} from "react-cookie";

class App extends React.Component {
    render() {
        if (!this.props.user) {
            let cookie_login = this.props.cookies.get("login");
            let login = window.location.pathname.substring(1);
            let logged = false
            console.log("Get cookie", cookie_login)
            console.log("Get login", login)
            if (cookie_login == login) {
                logged = true
                console.log("Logged", logged)
            }

            this.props.getUser(login, logged).then(() => {
            }).catch((error) => {
            });
        }

        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/signup" render={() => (<InitPage cookies={this.props.cookies} />)}/>
                        <PrivateRoute path="*" render={() => (<UserPage cookies={this.props.cookies} />)}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (login, logged) => dispatch(getUserAction(login, logged)),
    }
};

const WrappedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default withCookies(WrappedApp);
