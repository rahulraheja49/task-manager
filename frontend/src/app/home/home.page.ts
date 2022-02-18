import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public user: User | null;

  constructor(authService: AuthService) {
    var self = this;
    authService.getUser().then((user) => {
      self.user = user;
    });
  }
}
