import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IUserToken } from '../../shared/interfaces/iusertoken.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: 'user-details.component.html'
})
export class UserDetailsComponent implements OnInit {

  public user: IUserToken;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.user = this.authService.getUserInfo();

    if (!this.user) {
      this.router.navigateByUrl('/login');
    }
  }

}
