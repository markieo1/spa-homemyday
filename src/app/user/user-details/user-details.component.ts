import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IUserToken } from '../../shared/interfaces/iusertoken.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: 'user-details.component.html',
  styles: []
})
export class UserDetailsComponent implements OnInit {

  public user: IUserToken;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.getUserInfo();
  }

}
