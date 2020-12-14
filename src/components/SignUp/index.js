import React from 'react';
import styles from './index.module.css';
import Button from '../Button';
import {connect} from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import { loginAction, signupAction} from "../../actions/user";


function isCorrectEmail(login) {
    return login.length >= 5
}

function isCorrectPassword(password) {
    return password.length >= 5
}

class SignUp extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    state = {
        login: '',
        password: '',
        repeatPassword: '',
        loginError: false,
        passwordError: false,
        repeatPasswordError: false,
        errorText: '',
        isSignUp: false
    };

    render() {
        let {
            login,
            password,
            repeatPassword,
            errorText,
            isSignUp
        } = this.state;

        if (this.props.loading) {
            return (
                <form className={styles.wrapper}>
                    <h1>LOADING...</h1>
                </form>
                );
        }

        if (!isSignUp) {
            return (
                <form className={styles.wrapper}>
                    <div className={styles.inputs}>
                        <div className={styles.input_text}>Username</div>
                        <input name="login" type="login"
                               className={styles.input}
                               onChange={this.onChangeLogin}
                               onKeyDown={this._handleKeyDown}
                               value={login}
                               />
                        <div className={styles.input_text}>Password</div>
                        <input name="password" type="password"
                               className={styles.input}
                               onChange={this.onChangePassword}
                               onKeyDown={this._handleKeyDown}
                               value={password}
                               />
                    </div>

                    <p className={styles.error_text}>{errorText}</p>

                    <div className={styles.buttons}>
                        <Button onClick={this.changeToSignUp}>Sign up</Button>
                        <Button primary onClick={this.onToLogin}>Sign in</Button>
                    </div>
                </form>
            );
        } else {
            return (
                <form className={styles.wrapper}>
                    <div className={styles.inputs}>
                        <div className={styles.input_text}>Username</div>
                        <input name="login" type="login"
                               className={styles.input}
                               onChange={this.onChangeLogin}
                               onKeyDown={this._handleKeyDown}
                               value={login}/>
                        <div className={styles.input_text}>Password</div>
                        <input name="password" type="password"
                               className={styles.input}
                               onChange={this.onChangePassword}
                               onKeyDown={this._handleKeyDown}
                               value={password}/>
                        <div className={styles.input_text}>Repeat password</div>
                        <input name="repeatPassword" type="password"
                               className={styles.input}
                               onChange={this.onChangeRepeatPassword}
                               onKeyDown={this._handleKeyDown}
                               value={repeatPassword}/>
                    </div>

                    <p className={styles.error_text}>{errorText}</p>

                    <div className={styles.buttons}>
                        <Button primary onClick={this.onSignUp}>Sign up</Button>
                        <Button onClick={this.changeToLogin}>Sign in</Button>
                    </div>
                </form>
            );
        }

    }

    _handleKeyDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    changeToSignUp = (event) =>{
        event.preventDefault();
        this.setState({
            login: '',
            password: '',
            repeatPassword: '',
            loginError: false,
            passwordError: false,
            repeatPasswordError: false,
            errorText: '',
            isSignUp: true
        })
    }

    changeToLogin = (event) =>{
        event.preventDefault();
        this.setState({
            login: '',
            password: '',
            repeatPassword: '',
            loginError: false,
            passwordError: false,
            repeatPasswordError: false,
            errorText: '',
            isSignUp: false
        })
    }

    onToLogin = (event) => {
        event.preventDefault();
        const {
            login,
            password
        } = this.state;

        this.props.login(login, password, this.props.history).then(() => {
        }).catch((error) => {
            this.setState({
                login: '',
                password: '',
                repeatPassword: '',
                loginError: false,
                passwordError: false,
                repeatPasswordError: false,
                errorText: "No user with such login or password",
                isSignUp: false
            });
        });
    }

    onSignUp = (event) => {
        event.preventDefault();

        const {
            login,
            password,
            repeatPassword,
        } = this.state;

        if (!isCorrectEmail(login)) {
            this.setState({
                emailError: true,
                errorText: 'Username must contain at least 5 characters'
            });

            return
        }

        if (!isCorrectPassword(password)) {
            this.setState({
                passwordError: true,
                errorText: 'Password must contain at least 5 characters'
            });

            return
        }

        if (password !== repeatPassword) {
            this.setState({
                passwordError: true,
                repeatPasswordError: true,
                errorText: 'Passwords do not match'
            });

            return
        }

        this.props.signup(login, password, this.props.history).then(() => {
        }).catch((error) => {
            console.log("SOME ERROR",  this.props.errorMessage)
            this.setState({
                login: '',
                password: '',
                repeatPassword: '',
                loginError: false,
                passwordError: false,
                repeatPasswordError: false,
                errorText: "User with such login already exists",
                isSignUp: true
            });
        });
    };

    onChangeLogin = (event) => {
        this.resetAllErrors();
        this.setState({login: event.target.value})
    };

    onChangePassword = (event) => {
        this.resetAllErrors();
        this.setState({password:  event.target.value})
    };

    onChangeRepeatPassword = (event) => {
        this.resetAllErrors();
        this.setState({repeatPassword:  event.target.value})
    };

    resetAllErrors = (event) => {
        this.setState({
            loginError: false,
            passwordError: false,
            repeatPasswordError: false,
            errorText: ''
        })
    };
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.userReducer.error,
        loading: state.userReducer.isFetching,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (...args) => dispatch(signupAction(...args)),
        login: (...args) => dispatch(loginAction(...args)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));