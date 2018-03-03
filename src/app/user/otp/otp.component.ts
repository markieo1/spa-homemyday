import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IUserToken } from '../../shared/interfaces/iusertoken.interface';
import { Router } from '@angular/router';
import { TwofactorService } from '../twofactor.service';
import { IOtpModel } from './iotpmodel.class';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-otp',
  templateUrl: 'otp.component.html'
})
export class OtpComponent implements OnInit {
  public user: IUserToken;
  public otpDetails: IOtpModel;
  public otp: string;

  constructor(
    private authService: AuthService,
    private twofactorService: TwofactorService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUserInfo();

    this.reloadDetails();
  }

  public setup() {
    this.twofactorService.setup().subscribe(
      details => {
        this.otpDetails = details;
      },
      error => {
        this.alertService.showError('An error has occurred while setting up.');
      }
    );
  }

  public disable() {
    this.twofactorService.disable().subscribe(
      () => {
        this.reloadDetails();
        this.alertService.showSuccess('Two factor auth disabled');
      },
      error => {
        this.alertService.showError('An error has occurred while disabling.');
      }
    );
  }

  public confirm() {
    this.twofactorService.confirm(this.otp).subscribe(
      () => {
        this.otp = '';
        this.reloadDetails();
        this.alertService.showSuccess('Two factor auth confirmed');
      },
      error => {
        this.otp = '';

        this.alertService.showError('An error has occurred while confirming.');
      }
    );
  }

  private reloadDetails() {
    this.twofactorService.getDetails().subscribe(
      details => {
        this.otpDetails = details;
      },
      error => {
        this.alertService.showError(
          'An error has occurred while loading the details.'
        );
      }
    );
  }
}
