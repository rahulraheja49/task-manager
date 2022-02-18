import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/user';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public user: User | null;

  constructor(private authService: AuthService) {
    var self = this;
    authService.isLoggedIn().subscribe({
      next(_) {
        authService.getUser().then((user) => {
          self.user = user;
        });
      },
      error(msg) {
        console.log('Error Getting AuthService observable: ', msg);
      },
    });
  }

  ngOnInit() {}
}
