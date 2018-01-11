import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navigation-topbar',
  templateUrl: 'topbar.component.html'
})
export class TopbarComponent {

  constructor(private authService: AuthService) {

  }

  logout() {
    this.authService.logout();
  }
}
