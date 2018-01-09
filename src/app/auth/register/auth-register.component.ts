import { Component } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';

@Component({
  selector: 'app-auth-register',
  templateUrl: 'auth-register.component.html'
})
export class AuthRegisterComponent extends BaseComponent {
  constructor() {
    super();
  }
}
