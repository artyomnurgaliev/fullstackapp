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
            return {
                ...state,
                isFetching: false,
                error: null,
                user: action.payload ? action.payload.user : null
            };
        default:
            return state;
    }
};

export default userReducer;
