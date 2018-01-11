import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BaseComponent } from './shared/base/basecomponent.class';
import { Console } from '@angular/core/src/console';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent extends BaseComponent implements OnInit {

	/**
	* Determines if logged in
	*/
	public isLoggedIn: boolean;

	constructor(private authService: AuthService) { 
		super();
	}

	ngOnInit() {
		this.subscription = this.authService.loggedIn().subscribe((response) => {
			this.isLoggedIn = response;
		}); 
	}
}