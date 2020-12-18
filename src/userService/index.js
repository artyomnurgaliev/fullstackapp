import axios from 'axios';

import default_photo from '../images/default.png';
import User from './User';

//const USER_API_BASE_URL = "http://localhost:8080/api/v1/users"
const USER_API_BASE_URL = "https://achievehubbackendv1.herokuapp.com/api/v1/users"

const UserService = {
    signup(login, password) {
        let new_user = new User(login, login, password, '', default_photo, [], true);
        const user = axios.put(USER_API_BASE_URL + '/signup', new_user.Serialization, {params: {login: login}});
        console.log("USERRRRR", user)
        return user.then(user => {
            console.log("SIGN UP");
            let new_user = new User();
            new_user.init = user['data'];
            new_user.Logged = true;
            return {user: new_user};
        });
    },
    login(email, password) {
        const user = axios.get(USER_API_BASE_URL + '/login', {params: {login: email, password: password}});
        console.log("USERRRRR", user)
        return user.then(user => {
            console.log("LOGIN")
            let new_user = new User();
            new_user.init = user['data'];
            new_user.Logged = true;
            return {user: new_user};
        });
    },
    getUser(login, logged) {
        const user = axios.get(USER_API_BASE_URL + '/get_user', {params: {login: login}});
        return user.then(user => {
            let new_user = new User();
            new_user.init = user['data'];
            console.log("Logged there", logged);
            new_user.Logged = logged;
            return {user: new_user};
        });
    },
    setUserInfo(user) {
        const res = axios.put(USER_API_BASE_URL + '/update', user.Serialization,
            {
                params: {
                    login: user.Login
                }
            });
        return res.then(user => {
            let new_user = new User();
            new_user.init = user['data'];
            new_user.Logged = true;
            return {user: new_user};
        });
    },
    updateProject(user, project, pictures, init_name) {
        const {name, access_level, description} = project;
        const res = axios.put(USER_API_BASE_URL + '/update_project',
            {
                name: name, access_level: access_level,
                description: description, pictures: pictures
            },
            {
                params: {
                    login: user.Login,
                    initial_project_name: init_name,
                }
            });
        return res.then(user => {
            let new_user = new User();
            new_user.init = user['data'];
            new_user.Logged = true;
            return {user: new_user};
        });
    },
    addProject(user, project, pictures) {
        const {name, access_level, description} = project;
        const res = axios.put(USER_API_BASE_URL + '/add_project',
            {
                name: name, access_level: access_level,
                description: description, pictures: pictures
            },
            {params: {login: user.Login}});
        return res.then(user => {
            let new_user = new User();
            new_user.init = user['data'];
            new_user.Logged = true;
            return {user: new_user};
        });
    },
    deleteProject(user, project_name) {
        const res = axios.get(USER_API_BASE_URL + '/delete_project',
            {params: {login: user.Login, projectName: project_name}});
        return res.then(user => {
            let new_user = new User();
            new_user.init = user['data'];
            new_user.Logged = true;
            return {user: new_user};
        });
    },
    getUserProject(user, name) {
        const res = axios.get(USER_API_BASE_URL + '/get_user_project',
            {params: {login: user.Login, name: name}});

        return res.then(projects => {
            return {projects: projects['data']}
        });
    },
    getProject(name) {
        const res = axios.get(USER_API_BASE_URL + '/get_project',
            {params: {name: name}});
        return res.then(projects => {
            return {projects: projects['data']}
        });
    }
}

export default UserService;

