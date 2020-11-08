import React from 'react';
import styles from './index.module.css';
import Input from '../Input';
import Button from '../Button';
import {connect} from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import {tologin, signup, resetError} from "../../actions/user";


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
            loginError,
            passwordError,
            repeatPasswordError,
            isSignUp
        } = this.state;

        if (errorText === '') {
            errorText = this.props.error;
        }

        if (!isSignUp) {
            return (
                <form className={styles.wrapper}>
                    <div className={styles.inputs}>
                        <div className={styles.input_text}>Username</div>
                        <Input name="login" type="login"
                               className={styles.input}
                               onChange={this.onChangeLogin}
                               value={login}
                               error={loginError}/>
                        <div className={styles.input_text}>Password</div>
                        <Input name="password" type="password"
                               className={styles.input}
                               onChange={this.onChangePassword}
                               value={password}
                               error={passwordError}/>
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
                        <Input name="login" type="login"
                               className={styles.input}
                               onChange={this.onChangeLogin}
                               value={login}
                               error={loginError}/>
                        <div className={styles.input_text}>Password</div>
                        <Input name="password" type="password"
                               className={styles.input}
                               onChange={this.onChangePassword}
                               value={password}
                               error={passwordError}/>
                        <div className={styles.input_text}>Repeat password</div>
                        <Input name="repeatPassword" type="password"
                               className={styles.input}
                               onChange={this.onChangeRepeatPassword}
                               value={repeatPassword}
                               error={repeatPasswordError}/>
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

    changeToSignUp = (event) =>{
        event.preventDefault();
        this.props.resetError();
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
        this.props.resetError();
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
        const { match, location, history } = this.props;
        const {
            login,
            password
        } = this.state;

        console.log('login', login);
        console.log('password', password);

        this.props.tologin(login, password, history);
    }

    onSignUp = (event) => {
        event.preventDefault();
        const { match, location, history } = this.props;

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
        console.log('login', login);
        console.log('password', password);

        this.props.signup(login, password, history);
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
        error: state.userReducer.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (login, password, history) => dispatch(signup(login, password, history)),
        tologin: (login, password, history) => dispatch(tologin(login, password, history)),
        resetError: () => dispatch(resetError())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));