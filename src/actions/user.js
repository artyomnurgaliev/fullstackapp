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
    console.log("fetch success")
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

export function updateProjectAction(user, project, pictures, init_name) {
    return dispatch => {
        dispatch(fetchStart());
        return userService.updateProject(user, project, pictures, init_name).then((data) => {
            dispatch(fetchSuccess(data));
        })
            .catch((error) => {
                dispatch(fetchFail(error.response.data.message))
                throw Error(error)
            });
    }
}

export function addProjectAction(user, project, pictures) {
    return dispatch => {
        dispatch(fetchStart());
        return userService.addProject(user, project, pictures).then((data) => {
            dispatch(fetchSuccess(data));
        })
            .catch((error) => {
                dispatch(fetchFail(error.response.data.message))
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
                dispatch(fetchFail(error.response.data.message))
                throw Error(error)
            });
    }
}


export function setUserInfoAction(user) {
    return dispatch => {
        dispatch(fetchStart());
        return userService.setUserInfo(user).then((data) => {
            dispatch(fetchSuccess(data));
        })
            .catch((error) => {
                dispatch(fetchFail(error.response.data.message))
                throw Error(error)
            });
    }
}


export function getUserAction(login, logged) {
    return dispatch => {
        dispatch(fetchStart());
        return userService.getUser(login, logged).then((data) => {
            dispatch(fetchSuccess(data));
        })
            .catch((error) => {
                dispatch(fetchFail(error.response.data.message))
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


export function loginAction(login, password, history, cookies) {
    return dispatch => {
        dispatch(fetchStart());

        return userService.login(login, password).then((data) => {
            console.log("Setting cookies");
            cookies.set("login", login, { expires: new Date(Date.now() + 1000 * 60 * 10) });
            dispatch(fetchSuccess(data));
            history.push('/' + login);

        })
            .catch((error) => {
                dispatch(fetchFail(error.response.data.message));
                throw Error(error);
            });
    }
}

export function logoutAction(cookies, history) {
    return dispatch => {
        dispatch(fetchStart());
        console.log("Setting cookies")
        cookies.set("login", "undefined");
        dispatch(fetchSuccess(null));
        console.log("Logged out");
        history.push('/signup');
    }
}

export function signupAction(login, password, history, cookies) {
    return dispatch => {
        dispatch(fetchStart());
        console.log("Before sign up");
        return userService.signup(login, password).then((data) => {
            console.log("After sign up");
            console.log("Setting cookies")
            cookies.set("login", login, { expires: new Date(Date.now() + 1000 * 60 * 10) })
            dispatch(fetchSuccess(data));
            history.push('/' + login);
        })
            .catch((error) => {
                console.log("Error in sign up");
                dispatch(fetchFail(error.response.data.message))
                throw Error(error)
            });
    }
}

