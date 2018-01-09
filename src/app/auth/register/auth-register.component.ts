import { Component } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from './registermodel.class';
import { equalValidator } from '../../shared/validator/equal.validator';

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

  constructor(private fb: FormBuilder) {
    super();
    this.registerModel = new RegisterModel();

    this.createForm();
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
