import default_photo from '../images/default.png';

class User {
    constructor(login = "",
                fullName = "",
                password = "",
                description = "",
                photo = null,
                projects = null,
                logged = false) {
        this.login = login ? login : "";
        this.fullName = fullName ? fullName : "";
        this.password = password ? password : "";
        this.description = description ? description : "";
        this.photo = photo ? photo : default_photo;
        this.projects = projects ? projects : null;
        this.logged = logged ? logged : false
    }

    set init(data) {
        this.password = data['password'] ? data['password']: "";
        this.login = data['login'] ? data['login']: "";
        this.fullName = data['fullname'] ? data['fullname']: "";
        this.description = data['description'] ? data['description']: "";
        this.photo = data['photo'] ? data['photo']: default_photo;
        this.projects = data['projects'] ? data['projects']: [];
    }

    get Serialization() {
        console.log("PHOTOOOO", this.photo)

        return {login: this.login, fullname: this.fullName,
            password: this.password, description: this.description,
            photo: this.photo, projects: this.projects};
    }

    get Login() {
        return this.login;
    }

    get Logged() {
        return this.logged;
    }

    set Logged(logged) {
        return this.logged = logged;
    }

    get Password() {
        return this.password;
    }

    get Info() {
        return [this.fullName, this.description, this.photo];
    }

    get Fields() {
        return [this.login,
            this.fullName,
            this.password,
            this.description,
            this.photo,
            this.projects]
    }

    get Projects() {
        return this.projects;
    }
};

export default User;