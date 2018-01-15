import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserRoles } from '../../shared/enums/userroles.enum';

@Component({
  selector: 'app-navigation-sidebar',
  templateUrl: 'sidebar.component.html'
})
export class SidebarComponent {

  public admin: boolean;

  constructor(private authService: AuthService) {
    const userInfo = authService.getUserInfo();

    if (userInfo.role === UserRoles.Administrator) {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }
}
