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

/*
function fetchFail(payload) {
  return {
    type: 'USER_FAIL',
    payload
  }
}

function fetchSuccess(payload) {
  return {
    type: 'USER_SUCCESS',
    payload
  }
}

export function setUsers() {
  return {
    type: 'SET_USERS'
  }
}

export function getUsersAction() {
  return dispatch => {
    let users = userService.getUsers();
    dispatch(setUsers(users));
  }
}

export function loginAction(login, password) {
  return dispatch => {
    try {
      let user = userService.login(login, password);
      dispatch(fetchSuccess(user));
    } catch (err) {
      console.log('error in login Action', err);
      dispatch(fetchFail(err));
    }
  }
}

export function signupAction(login, password) {
  return dispatch => {
    try {
      let user = userService.signup(login, password);
      dispatch(fetchSuccess(user));
    } catch (err) {
      dispatch(fetchFail(err));
    }
  }
}

export function logoutAction() {
  return dispatch => {
    userService.logout();
    dispatch(fetchSuccess(null));
  }
}*/
