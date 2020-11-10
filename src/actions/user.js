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
    return {
        type: 'USER_FETCHING'
    }
}

function fetchFail(payload) {
    return {
        type: 'USER_FAIL',
        payload
    }
}

export function fetchSuccess(payload) {
    return {
        type: 'USER_SUCCESS',
        payload
    }
}

export function fetchProjects(payload) {
    return {
        type: 'PROJECTS_SUCCESS',
        payload
    }
}

export function setProjectAction(user, project, pictures, init_name) {
    return dispatch => {
        dispatch(fetchStart());
        return userService.setProject(user, project, pictures, init_name).then((data) => {
            dispatch(fetchSuccess(data));
        })
            .catch((error) => {
                dispatch(fetchFail(error))
                throw Error(error)
            });
    }
}

export function deleteProjectAction(user, project_name) {
    return dispatch => {
        dispatch(fetchStart());
        return userService.deleteProject(user, project_name).then((data) => {
            dispatch(fetchSuccess(data));
        })
            .catch((error) => {
                dispatch(fetchFail(error))
                throw Error(error)
            });
    }
}


export function setUserAction(user) {
    return dispatch => {
        dispatch(fetchStart());
        return userService.setUser(user).then((data) => {
            dispatch(fetchSuccess(data));
        })
            .catch((error) => {
                dispatch(fetchFail(error))
                throw Error(error)
            });
    }
}


export function getUserAction(login) {
    return dispatch => {
        dispatch(fetchStart());
        return userService.getUser(login).then((data) => {
            dispatch(fetchSuccess(data));
        })
            .catch((error) => {
                dispatch(fetchFail(error))
                throw Error(error)
            });
    }
}

export function getUserProjectAction(user, name) {
    return dispatch => {
        dispatch(fetchStart());
        return userService.getUserProject(user, name).then((data) => {
            dispatch(fetchProjects(data));
        });
    }
}

export function getProjectAction(name) {
    return dispatch => {
        dispatch(fetchStart());
        return userService.getProject(name).then((data) => {
            dispatch(fetchProjects(data));
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

