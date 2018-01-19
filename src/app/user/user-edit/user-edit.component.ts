import { Component, OnInit } from '@angular/core';
import { IUserToken } from '../../shared/interfaces/iusertoken.interface';
import { AuthService } from '../../auth/auth.service';
import { AlertService } from '../../alert/alert.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { equalValidator } from '../../shared/validator/equal.validator';

@Component({
  selector: 'app-user-edit',
  templateUrl: 'user-edit.component.html'
})
export class UserEditComponent implements OnInit {

  user: IUserToken;

  currentPassword: string;
  newPassword: string;
  newPasswordRepeat: string;

  detailsForm: FormGroup;

  submitInProgress = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private alertService: AlertService, private router: Router) {
  }

  ngOnInit() {
    this.user = this.authService.getUserInfo();

    this.createForm();

    if (!this.user) {
      this.router.navigateByUrl('/login');
    }
  }

  /**
   * Called when the form is submitted.
   */
  onSubmit() {
    if (!this.detailsForm.valid) {
      return;
    }

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

  /**
   * Create the registration form.
   */
  private createForm() {
    this.detailsForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordRepeat: ['', Validators.required]
    }, {
        validator: equalValidator('newPassword', 'newPasswordRepeat')
    });
  }
}
