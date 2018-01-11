import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-navigation-topbar',
  templateUrl: 'topbar.component.html'
})
export class TopbarComponent implements OnInit {

  private email: string;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.email = this.authService.getEmail();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
