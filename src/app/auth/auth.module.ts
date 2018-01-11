import { NgModule } from '@angular/core';
import { Http, RequestOptions, HttpModule } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthRegisterComponent } from './register/auth-register.component';
import { BrowserModule } from '@angular/platform-browser';
import { AuthLoginComponent } from './login/auth-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AlertModule } from '../alert/alert.module';
import { AuthGuard } from './auth-guard.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  }), http, options);
}

@NgModule({
  declarations: [
    AuthRegisterComponent,
    AuthLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    AuthRoutingModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthService,
    AuthGuard
  ]
})
export class AuthModule { }
