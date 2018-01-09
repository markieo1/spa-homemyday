import { tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: Auth, private router: Router) {}

    canActivate() {
        if(this.auth.loggedIn()) {
            return tokenNotExpired();
        } 
        else {
            this.router.navigate(['unauthorized']);
            return false;
        }
    }
}