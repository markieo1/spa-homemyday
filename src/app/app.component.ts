import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

	/**
	* Determines if logged in
	*/
	public isLoggedIn: boolean;

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.authService.loggedIn().subscribe((response) => {
		 	response = this.authService.isLoggedIn();
		});    
	}
}
