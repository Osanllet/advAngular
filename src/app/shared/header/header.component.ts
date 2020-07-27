import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public user: User;

  constructor( private userService: UserService ) {
    this.user = userService.user;
  }

  logout() {
    this.userService.logout();
  }

}
