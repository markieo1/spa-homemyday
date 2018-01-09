import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, NgModel} from '@angular/forms';

import { AuthGuard } from '../auth/auth-guard.service';


 
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
 
export class LoginComponent implements OnInit {

    constructor() {
        
    }

    ngOnInit() {

    }

    onSubmit(form: NgForm) {

    }
} 