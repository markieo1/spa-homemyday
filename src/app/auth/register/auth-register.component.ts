import { Component } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from './registermodel.class';
import { equalValidator } from '../../shared/validator/equal.validator';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-register',
  templateUrl: 'auth-register.component.html'
})
export class AuthRegisterComponent extends BaseComponent {
  /**
    * The register form
    */
  public registerForm: FormGroup;

  /**
    * The register model
    */
  public registerModel: RegisterModel;

  /**
    * Determines if a submit is in progress
    */
  public submitInProgress: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    super();
    this.registerModel = new RegisterModel();

    this.createForm();
  }

  public onSubmit(): void {
    if (!this.registerForm.valid) {
      return;
    }

    if (!this.registerModel.doPasswordsMatch()) {
      return;
    }

    this.submitInProgress = true;

    this.authService.register(this.registerModel.email, this.registerModel.password, this.registerModel.confirmPassword)
      .subscribe((registered) => {
        this.submitInProgress = false;

      }, error => {
        this.submitInProgress = false;
        console.error(error);
      });
  }

  /**
    * Creates the register form
    */
  private createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
        validator: equalValidator('password', 'confirmPassword')
      });
  }
}
