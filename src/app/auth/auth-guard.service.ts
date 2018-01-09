import { tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        if(this.authService.loggedIn()) {
            return tokenNotExpired();
        } 
        else {
            this.router.navigate(['unauthorized']);
            return false;
        }
    }
}