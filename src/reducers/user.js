import userService from "../userService";
import User from '../userService/User';

let initialState = {
    error: null,
    user: null,
    users: userService.getUsers()
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET_ERROR':
            return {
                ...state,
                error: null,
                users: userService.getUsers(),
            }

        case 'ADD_PROJECT':
            const {name, access_level, description, pictures} = action.placeholder;
            let projects = state.user.Projects;
            projects.push({id: Date.now(), name, access_level, description, pictures});
            const new_user = new User(...state.user.Fields, projects);
            let new_users = state.users;
            new_users.set(state.user.Login, new_user);
            return {
                ...state,
                user: new_user,
                users: new_users
            }

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
                    error: err,
                    user: null,
                    users: userService.getUsers()
                }
            }
            const path = '/' + action.login;
            action.history.push(path);
            return {
                error: null,
                user: user,
                users: userService.getUsers()
            }
        }

        /*
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
