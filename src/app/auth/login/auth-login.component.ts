import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { User } from './login.model';

@Component({
	selector: 'app-auth-login',
	templateUrl: './auth-login.component.html'
})
export class AuthLoginComponent extends BaseComponent implements OnInit {

	public loading = false;
	private login: User;

	@ViewChild('f')
	private form: NgForm;

	constructor(private authService: AuthService) {
		super();
	}

	ngOnInit() {
		this.authService.logout();
	}

	onSubmit(form: NgForm) {
		const { email, password } = form.value;
		this.authService.login(this.login.email, this.login.password);
	}
}
