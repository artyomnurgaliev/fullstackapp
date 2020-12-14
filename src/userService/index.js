import logo from '../images/photo1.jpeg';
import auto from '../images/auto.jpg';

import axios from 'axios';

import photo1 from '../images/photo1.jpeg';
import photo2 from '../images/photo2.jpeg';
import photo3 from '../images/photo3.jpeg';
import default_photo from '../images/default.png';
import User from './User';

const pictures = [
    {
        id: 1,
        src: auto,
    },
    {
        id: 2,
        src: logo,
    }
];

const pictures2 = [
    {
        id: 1,
        src: photo1,
    },
    {
        id: 2,
        src: photo2,
    },
    {
        id: 3,
        src: photo3
    }
];

let description2 =
    `Банальные, но неопровержимые выводы, а также элементы политического процесса 
освещают чрезвычайно интересные особенности картины в целом, однако
конкретные выводы, разумеется, объявлены нарушающими 
общечеловеческие нормы этики и морали. 
Внезапно, стремящиеся вытеснить традиционное производство, нанотехнологии 
являются только методом политического участия и рассмотрены исключительно 
в разрезе маркетинговых и финансовых предпосылок. 

Не следует, однако, забывать, что убеждённость некоторых оппонентов обеспечивает 
широкому кругу (специалистов) участие в формировании своевременного 
выполнения сверхзадачи. Каждый из нас понимает очевидную вещь: 
существующая теория играет важную роль в формировании своевременного 
выполнения сверхзадачи. 

Как уже неоднократно упомянуто, действия представителей 
оппозиции объективно рассмотрены соответствующими инстанциями. 
Приятно, граждане, наблюдать, как интерактивные прототипы могут 
быть описаны максимально подробно. Внезапно, реплицированные 
с зарубежных источников, современные исследования освещают
чрезвычайно интересные особенности картины в целом, однако конкретные выводы,
разумеется, представлены в исключительно положительном свете.`

let artyom = new User('artyomnurgaliev',
    'Artyom Nurgaliev',
    'password',
    `Very interesting personalities, very enjoyable spent of time
boyz Разнообразный и богатый опыт консультация с широким активом
обеспечивает широкому кругу. Идейные соображения высшего порядк
а также рамки и место обучения кадров обеспечивает широкому кругу
(специалистов) участие в формировании новых предложений. 
Равным образом постоянный 
количественный рост и сфера нашей активности играет важную роль в
формировании системы
обучения кадров, соответствует насущным потребностям.

mail: artyommailmailmail@mail.ru

phone: 8 999 544 02 32

vk: vk.com/myvkpage
`,
    logo,
    [{
        id: 1,
        name: 'First Project',
        access_level: 'public',
        description: 'my first project',
        pictures: pictures
    }, {
        id: 2,
        name: 'Second Project',
        access_level: 'public',
        description: description2,
        pictures: pictures2
    }, {
        id: 3,
        name: 'Third Project',
        access_level: 'private',
        description: 'my third project',
        pictures: []
    }, {
        id: 4,
        name: 'Second',
        access_level: 'public',
        description: description2,
        pictures: pictures2
    }], false);


let users = new Map([
    ['artyomnurgaliev', artyom]
]);

function resolve(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 1);
    });
}

function reject(error) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(error);
        }, 1);
    });
}

async function toSignUp(login, password) {
    if (users.has(login)) {
        return reject("User with this login already exists");
    } else {
        let new_user = new User(login, login, password, '', '', '', default_photo, [], true);
        users.set(login, new_user);
        console.log('users signup', users);
        return resolve({user: users.get(login)});
    }
}

async function toLogin(login, password) {
    if (!users.has(login)) {
        return reject("No user with such username");
    } else {
        if (users.get(login).Password !== password) {
            return reject("Incorrect password");
        } else {
            users.get(login).Logged = true;
            console.log('users', users);
            return resolve({user: users.get(login)});
        }
    }
}

async function getUser(login) {
    if (!users.has(login)) {
        return reject("No user with such username");
    } else {
        return resolve({user: users.get(login)});
    }
}

async function getProject(name) {
    let projects = [];
    users.forEach(function (user) {
        user.Projects.forEach(function (project) {
            console.log('name', name);
            console.log('project', project);
            if (project.name.toLowerCase().startsWith(name.toLowerCase())) {
                projects.push(project);
            }
        });
    });
    return resolve({projects: projects});
}

async function getUserProject(user, name) {
    let projects = [];
    users.get(user.Login).Projects.forEach(function (project) {
        if (project.name.toLowerCase().startsWith(name.toLowerCase())) {
            projects.push(project);
        }
    });
    return resolve({projects: projects});
}


async function setUserInfo(user) {
    if (!users.has(user.Login)) {
        return reject("No user with such username");
    } else {
        users.set(user.Login, user);
        return resolve({user: users.get(user.Login)});
    }
}

async function logout(user) {
    if (!users.has(user.Login)) {
        return reject("No user with such username");
    } else {
        users.get(user.Login).Logged = false;
        return resolve({user: null});
    }
}

async function setProject(user, project, pictures, init_name) {
    if (!users.has(user.Login)) {
        console.log('There? really?');
        return reject("No user with such username");
    } else {
        console.log('Project in set Project', project);
        const {name, access_level, description} = project;
        let projects = user.Projects;
        let idx = -1;
        projects.forEach((item, index) => {
            if (item.name === init_name) {
                idx = index;
            }
        });
        if (idx === -1) {
            projects.push({id: Date.now(), name, access_level, description, pictures});
        } else {
            projects[idx] = ({id: Date.now(), name, access_level, description, pictures});
        }
        const new_user = new User(...user.Fields, projects);
        users.set(user.Login, new_user);
        return resolve({user: users.get(user.Login)});
    }
}

async function deleteProject(user, project_name) {
    if (!users.has(user.Login)) {
        return reject("No user with such username");
    } else {
        let projects = user.Projects;
        let idx = -1;
        projects.forEach((item, index) => {
            if (item.name === project_name) {
                idx = index;
            }
        });
        if (idx === -1) {
            return reject("No project");
        }
        delete projects[idx];
        const new_user = new User(...user.Fields, projects);
        users.set(user.Login, new_user);
        return resolve({user: users.get(user.Login)});
    }
}

//const USER_API_BASE_URL = "http://localhost:8080/api/v1/users"
const USER_API_BASE_URL = "https://achievehubbackendv1.herokuapp.com/api/v1/users"

const UserService = {
    signup(login, password) {
        let new_user = new User(login, login, password,  '', default_photo, [], true);
        const user = axios.put(USER_API_BASE_URL + '/signup', new_user.Serialization, {params: {login: login}});
        return user.then(user => {
            let new_user = new User();
            new_user.init = user['data'];
            new_user.Logged = true;
            return {user: new_user};
        });
    },
    login(email, password) {
        const user = axios.get(USER_API_BASE_URL + '/login', {params: {login: email, password: password}});
        return user.then(user => {
            let new_user = new User();
            new_user.init = user['data'];
            new_user.Logged = true;
            return {user: new_user};
        });
    },
    getUser(login) {
        const user = axios.get(USER_API_BASE_URL + '/get_user', {params: {login: login}});
        return user.then(user => {
            let new_user = new User();
            new_user.init = user['data'];
            new_user.Logged = false
            return {user: new_user};
        });
    },
    setUserInfo(user) {
        const res = axios.put(USER_API_BASE_URL + '/update', user.Serialization,
            {params: {login: user.Login,
                password: user.Password}});
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
            {name: name, access_level: access_level,
            description: description, pictures: pictures},
            {params: {login: user.Login, password: user.Password,
                initial_project_name: init_name,}});
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
            {name: name, access_level: access_level,
                description: description, pictures: pictures},
            {params: {login: user.Login, password: user.Password}});
        return res.then(user => {
            let new_user = new User();
            new_user.init = user['data'];
            new_user.Logged = true;
            return {user: new_user};
        });
    },
    deleteProject(user, project_name) {
        const res = axios.get(USER_API_BASE_URL + '/delete_project',
            {params: {login: user.Login, password: user.Password, projectName: project_name}});
        return res.then(user => {
            let new_user = new User();
            new_user.init = user['data'];
            new_user.Logged = true;
            return {user: new_user};
        });
    },
    getUserProject(user, name) {
        const res = axios.get(USER_API_BASE_URL + '/get_user_project',
            {params: {login: user.Login, password: user.Password, name: name}});

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
    },
    logout(user) {
        return resolve({user: null});
    }
}

export default UserService;

