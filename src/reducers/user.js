import User from '../userService/User';
import userService from '../userService/index';

let initialState = {
    error: null,
    user: null,
    editing_project: false,
    project_edition_error: false,
    project: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EDITING_PROJECT':
            return {
                ...state,
                editing_project: true,
                project: action.project
            }

        case 'DELETE_PROJECT': {
            const name = action.placeholder;
            let projects = state.user.Projects;
            let idx = -1;
            projects.forEach((item, index) => {
                if (item.name === name) {
                    idx = index;
                }
            });
            if (idx !== -1) {
                delete projects[idx];
            }
            const new_user = new User(...state.user.Fields, projects);
            let new_users = state.users;
            new_users.set(state.user.Login, new_user);
            return {
                ...state,
                user: new_user,
                users: new_users,
                project: null,
                editing_project: false
            }
        }

        case 'EDIT_PROJECT':
            const {name, access_level, description, pictures} = action.placeholder;
            let projects = state.user.Projects;
            let idx = -1;
            projects.forEach((item, index) => {
                if (item.name === name) {
                    idx = index;
                }
            });
            if (idx !== -1) {
                return {
                    ...state,
                    project_edition_error: true
                }
            }
            projects.push({id: Date.now(), name, access_level, description, pictures});
            const new_user = new User(...state.user.Fields, projects);
            let new_users = state.users;
            new_users.set(state.user.Login, new_user);
            return {
                ...state,
                user: new_user,
                users: new_users,
                project: null,
                editing_project: false
            }

        case 'USER_FETCHING':
            console.log('fetching');
            return {
                ...state,
                error: null,
                isFetching: true
            };
        case 'USER_FAIL':
            console.log('fail');
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        case 'USER_SUCCESS':
            console.log('success');
            console.log('users', action.payload.users);
            return {
                ...state,
                isFetching: false,
                error: null,
                user: action.payload.user,
                users: action.payload.users
            };
        /*
        case 'LOGIN': {
            let user;
            try {
                user = userService.login(action.login, action.password);
            } catch (err) {
                return {
                    ...state,
                    error: err,
                    users: userService.getUsers()
                }
            }
            const path = '/' + action.login;
            action.history.push(path);
            return {
                ...state,
                error: null,
                user: user,
                users: userService.getUsers()
            }
        }


        case 'SIGNUP': {
            let user;
            try {
                user = userService.signup(action.login, action.password);
            } catch (err) {
                return {
                    ...state,
                    error: err,
                    user: null,
                    users: userService.getUsers()
                }
            }
            const path = '/' + action.login;
            action.history.push(path);
            return {
                ...state,
                error: null,
                user: user,
                users: userService.getUsers()
            }
        }

        case 'RESET_ERROR':
            return {
                ...state,
                error: null,
                users: userService.getUsers(),
            }
        case 'SET_USERS':
            return {
                error: null,
                user: null,
                users: userService.getUsers()
            }

        case 'USER_FAIL':
            console.log('error found in reducer', action.payload);
            return {
                ...state,
                error: action.payload
            };
        case 'USER_SUCCESS':
            return {
                ...state,
                user: action.payload
            };
        */
        default:
            return state;
    }
};

export default userReducer;
