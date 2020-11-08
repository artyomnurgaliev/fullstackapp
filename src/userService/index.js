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
    },
    getUsers() {
        return users;
    }
};

export default UserService;
