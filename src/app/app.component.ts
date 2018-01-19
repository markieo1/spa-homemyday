import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BaseComponent } from './shared/base/basecomponent.class';

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
    this.authService.loggedIn()
      .subscribe((response) => {
        this.isLoggedIn = response;
      });
  }
}
