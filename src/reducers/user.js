let initialState = {
    error: null,
    editing_project: false,
    editing_main_page: false,
    project: null,
    main_page: true
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PROJECTS_SUCCESS':
            console.log('procs',action.payload.projects);
            return {
                ...state,
                isFetching: false,
                search_projects: action.payload.projects
            }

        case 'SEARCH':
            return {
                ...state,
                searching: true
            }

        case 'MAIN_SEARCH':
            return {
                ...state,
                main_searching: true
            }

        case 'MAIN_PAGE':
            return {
                ...state,
                main_page: true,
                searching: false
            }

        case 'SIGN_UP_PAGE':
            return {
                ...state,
                main_searching: false
            }


        case 'NOT_MAIN_PAGE':
            return {
                ...state,
                main_page: false,
                searching: false
            }

        case 'EDITING_PROJECT':
            return {
                ...state,
                editing_project: true,
                project: action.project
            }
        case 'END_EDITING_PROJECT':
            return {
                ...state,
                editing_project: false,
                project: null,
                main_page: false
            }

        case 'EDITING_USER':
            console.log('DATA', action.data);
            return {
                ...state,
                editing_main_page: true,
                data: action.data
            }
        case 'END_EDITING_USER':
            return {
                ...state,
                editing_main_page: false,
                main_page: true
            }

        /*
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
            projects[idx] = ({id: Date.now(), name, access_level, description, pictures});
            const new_user = new User(...state.user.Fields, projects);


            let new_users = state.users;
            new_users.set(state.user.Login, new_user);
            return {
                ...state,
                user: new_user,
                logged: true,
                project: null,
                editing_project: false
            }
        */
        case 'USER_FETCHING':
            return {
                ...state,
                error: null,
                isFetching: true
            };
        case 'USER_FAIL':
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        case 'USER_SUCCESS':
            console.log('USER SUCCESS is logged', action.payload);
            return {
                ...state,
                isFetching: false,
                error: null,
                user: action.payload.user
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
