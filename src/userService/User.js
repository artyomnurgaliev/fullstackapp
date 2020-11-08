class User {
    constructor(login, fullName, password, mail, phone, projects) {
        this.login = login;
        this.fullName = fullName;
        this.password = password;
        this.mail = mail;
        this.phone = phone;
        this.projects = projects;

    }

    get Login() {
        return this.login;
    }

    get Password() {
        return this.password;
    }

    get Info() {
        return [this.fullName, this.mail, this.phone];
    }

    get Fields() {
        return [this.login,
        this.fullName,
        this.password,
        this.mail,
        this.phone,
        this.projects]
    }

    get Projects() {
        return this.projects;
    }
};

export default User;