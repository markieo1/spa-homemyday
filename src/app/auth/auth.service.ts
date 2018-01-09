import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from './login/login.model';

import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

    constructor(protected http: Http) {
    }

    private user: Login;

    loggedIn() {
        return tokenNotExpired();
    }

    login(email: string, password: string) {
        return this.http.post(`${environment.apiUrl}/login`, {email: email, password: password})
        .map(user => {
            if (user && this.user.token) {
                console.log("test log in auth service");
                localStorage.setItem('currentUser', JSON.stringify(user));
            } 
            return user;
        });
    }

    logout() {
        localStorage.removeItem('token');
    }    
}