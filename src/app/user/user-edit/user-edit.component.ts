import { Component, OnInit } from '@angular/core';
import { IUserToken } from '../../shared/interfaces/iusertoken.interface';
import { AuthService } from '../../auth/auth.service';
import { AlertService } from '../../alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: 'user-edit.component.html',
  styles: []
})
export class UserEditComponent implements OnInit {

  user: IUserToken;

  currentPassword: string;
  newPassword: string;
  newPasswordRepeat: string;

  passwordsMatch = false;

  constructor(private authService: AuthService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getUserInfo();
  }

  onPasswordChange() {
    if (this.newPassword === this.newPasswordRepeat) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
  }

  save() {
    if (this.passwordsMatch) {
      this.authService.changePassword(this.currentPassword, this.newPassword)
      .subscribe(success => {
        if (success) {
          this.alertService.showSuccess('Details changed successfully!');
          this.router.navigateByUrl('/user');
        } else {
          this.alertService.showError('An error has occurred while trying to change password.');
        }
      });
    }
  }
}
