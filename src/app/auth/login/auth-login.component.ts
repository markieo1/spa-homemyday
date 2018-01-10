import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { LoginModel } from './login.model';
import { AlertService } from '../../alert/alert.service';
import { AppComponent } from '../../app.component';

@Component({
	selector: 'app-auth-login',
	templateUrl: './auth-login.component.html'
})
export class AuthLoginComponent extends BaseComponent implements OnInit {

	public loading = false;
	public loginModel: LoginModel;

	@ViewChild('f')
	private form: NgForm;

	constructor(private alertService: AlertService, private authService: AuthService, private router: Router) {
		super();
		this.loginModel = new LoginModel();
	}

	ngOnInit() {
		this.authService.logout();
	}

	onSubmit(form: NgForm) {
		this.subscription = this.authService.login(this.loginModel.email, this.loginModel.password)		
		.subscribe((loggedin) => {
			this.alertService.showSuccess('Successfully logged in.');
			this.authService.isLoggedIn();
			this.router.navigateByUrl('/dashboard');
		}, 
		error => {
			this.alertService.showError('An error has occurred while trying to login.');
		});
	}
}
