import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRegisterComponent } from './register/auth-register.component';
import { AuthLoginComponent } from './login/auth-login.component';

const routes: Routes = [
  {
    path: 'register',
    component: AuthRegisterComponent
  },
  {
    path: 'login',
    component: AuthLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
