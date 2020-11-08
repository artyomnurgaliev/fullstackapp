import logo from './image.png';
import auto from './auto.jpg';

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

let artyom = new User('artyomnurgaliev',
    'Artyom Nurgaliev',
    'password',
    'artyomnurgaliev@mail.ru',
    '8899998989',
    'Very interesting personalities, very enjoyable spent of time,' +
    ' boyz Разнообразный и богатый опыт консультация с широким активом' +
    ' обеспечивает широкому кругу. Идейные соображения высшего порядка,' +
    ' а также рамки и место обучения кадров обеспечивает широкому кругу ' +
    '(специалистов) участие в формировании новых предложений. Равным образом постоянный ' +
    'количественный рост и сфера нашей активности играет важную роль в формировании системы' +
    ' обучения кадров, соответствует насущным потребностям.',
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
        access_level: 'private',
        description: 'my second project',
        pictures: []
    }]);


let users = new Map([
    ['artyomnurgaliev', artyom]
]);

/*
const UserService = {
    signup(login, password) {
        if (users.has(login)) {
            throw "User with this login already exists";
        } else {
            let new_user = new User(login, '', password, '', '', []);
            users.set(login, new_user);
            console.log('users signup', users);
            return users.get(login);
        }
    },
    login(login, password) {
        if (!users.has(login)) {
            throw "No user with such username";
        } else {
            if (users.get(login).Password !== password) {
                throw "Incorrect password";
            } else {
                console.log('users', users);
                return users.get(login);
            }
        }
    },
    logout() {
        console.log('logout');
    }
};*/

function resolve(x) {
    return new Promise(resolve => {
        setTimeout(() => { resolve(x); }, 1);
    });
}

function reject(error) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { reject(error); }, 1);
    });
}

async function toSignUp(login, password) {
    if (users.has(login)) {
        return reject("User with this login already exists");
    } else {
        let new_user = new User(login, '', password, '', '', '', null, []);
        users.set(login, new_user);
        console.log('users signup', users);
        return resolve({user: users.get(login), users: users});
    }
}

async function toLogin(login, password) {
    if (!users.has(login)) {
        return reject("No user with such username");
    } else {
        if (users.get(login).Password !== password) {
            return reject("Incorrect password");
        } else {
            console.log('users', users);
            return resolve({user: users.get(login), users: users});
        }
    }
}

async function getUsers() {
    return resolve({user: null, users: users});
}

const UserService = {
    signup(login, password) {
        return toSignUp(login, password);
    },
    login(email, password) {
        return toLogin(email, password);
    },
    getUsers() {
        return getUsers();
    }
};

export default UserService;

