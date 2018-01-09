export class User {
  username: string;
  password: string;
  email: string;
  token: string;

  constructor(username, password, email, token) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.token = token;
  }
}
