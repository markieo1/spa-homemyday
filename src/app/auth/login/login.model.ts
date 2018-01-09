<<<<<<< HEAD
export class Login {
    
    _id : string;
    username: string;
    password: string;
    email: string;
    token: string;
=======
export class User {
  username: string;
  password: string;
  email: string;
  token: string;
>>>>>>> develop

  constructor(username, password, email, token) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.token = token;
  }
}
