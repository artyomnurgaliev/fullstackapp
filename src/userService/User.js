class User {
    constructor(login, fullName, password, mail, phone, description, photo, projects, logged) {
        this.login = login;
        this.fullName = fullName;
        this.password = password;
        this.mail = mail;
        this.phone = phone;
        this.description = description;
        this.photo = photo
        this.projects = projects;
        this.logged = logged;
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
        return [this.fullName, this.mail, this.phone, this.description, this.photo];
    }

    get Fields() {
        return [this.login,
            this.fullName,
            this.password,
            this.mail,
            this.phone,
            this.description,
            this.photo,
            this.projects]
    }

    get Projects() {
        return this.projects;
    }
};

export default User;