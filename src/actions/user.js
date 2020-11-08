/*
export function tologin(login, password, history) {
  return {
    type: 'LOGIN',
    login: login,
    password: password,
    history: history
  }
}
export function signup(login, password, history) {
  return {
    type: 'SIGNUP',
    login: login,
    password: password,
    history: history
  }
}

export function resetError() {
  return {
    type: 'RESET_ERROR',
  }
}

export function setUsers() {
  return {
    type: 'SET_USERS'
  }
}
*/

import userService from '../userService/index';

function fetchStart() {
    console.log('action fetching');
    return {
        type: 'USER_FETCHING'
    }
}

function fetchFail(payload) {
    console.log('action fail');
    return {
        type: 'USER_FAIL',
        payload
    }
}

export function fetchSuccess(payload) {
    console.log('action success');
    return {
        type: 'USER_SUCCESS',
        payload
    }
}


export function getUsersAction() {
    return dispatch => {
        dispatch(fetchStart());
        console.log('fetched');
        return userService.getUsers().then((data) => {
            console.log('got users in action', data);
            dispatch(fetchSuccess(data));
        })
            .catch((error) => {
                dispatch(fetchFail(error))
                throw Error(error)
            });
    }
}

export function loginAction(login, password) {
    return dispatch => {
        dispatch(fetchStart());
        return userService.login(login, password).then((data) => {
            dispatch(fetchSuccess(data));
        })
            .catch((error) => {
                dispatch(fetchFail(error))
                throw Error(error)
            });
    }
}

export function signupAction(login, password) {
    return dispatch => {
        dispatch(fetchStart());
        return userService.signup(login, password).then((data) => {
            dispatch(fetchSuccess(data));
        })
            .catch((error) => {
                dispatch(fetchFail(error))
                throw Error(error)
            });
    }
}

