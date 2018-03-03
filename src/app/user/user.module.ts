import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '../alert/alert.module';
import { AuthModule } from '../auth/auth.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { TwofactorService } from './twofactor.service';
import { OtpComponent } from './otp/otp.component';

@NgModule({
  declarations: [
    UserComponent,
    UserDetailsComponent,
    UserEditComponent,
    OtpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    AlertModule,
    UserRoutingModule
  ],
  providers: [TwofactorService],
  exports: []
})
export class UserModule {}
