import { Injectable, EventEmitter } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpHelper } from '../shared/helpers/http.helper';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
    private loggedInEmitter: BehaviorSubject<boolean>;

    constructor(protected http: Http) {
        this.loggedInEmitter = new BehaviorSubject(this.isLoggedIn());
    }

    /**
    * Checks if the user is logged in
    */
    isLoggedIn(): boolean {
        return tokenNotExpired();
    }

    /**
    * returns a new BehaviorSubject
    */
    loggedIn(): Observable<any> {
        return this.loggedInEmitter;
    }

    /**
        * Registers the user with the API
        * @param email The email of the user
        * @param password The password
        * @param confirmPassword The confirm password
    */
    public register(email: string, password: string, confirmPassword: string): Observable<any> {
        if (!email || !password || !confirmPassword) {
          return Observable.throw(new Error('Invalid data supplied!'));
        }
    
        // Check if the passwords are equal
        if (password !== confirmPassword) {
          return Observable.throw(new Error('Passwords do not match!'));
        }
    
        return this.http.post(`${environment.apiUrl}/authentication/register`, {
          email,
          password
        }, HttpHelper.getRequestOptions())
          .map(r => r.status === 201);
    }    
    

    /**
        * logs the user in with the API
        * @param email The email of the user
        * @param password The password
    */
    public login(email: string, password: string): Observable<any> {
        return this.http.post(`${environment.apiUrl}/authentication/login`, {
            email: email, 
            password: password
        })
        .map(response => {
            const responseToken = response.json().token;
			if (responseToken) {
                localStorage.setItem('token', responseToken);                
				return true;
            } 
            else {
                return false;
            }
        })
        .do((loggedIn) => this.loggedInEmitter.next(loggedIn));
    }

    logout() {
        localStorage.removeItem('token');
        this.loggedInEmitter.next(false);        
    }       
}