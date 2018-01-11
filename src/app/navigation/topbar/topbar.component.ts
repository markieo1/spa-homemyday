import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { IUserToken } from '../../shared/interfaces/iusertoken.interface';

@Component({
  selector: 'app-navigation-topbar',
  templateUrl: 'topbar.component.html'
})
export class TopbarComponent implements OnInit {

  private user: IUserToken;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.user = this.authService.getUserInfo();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
