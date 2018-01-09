export class Login {
    
    _id : string;
    username: string;
    password: string;
    email: string;
    token: string;

    constructor(id, username, password, email, token) {
        this._id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.token = token;
    }
}