import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from './auth/user';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public user: User | null;
  public showLogout: Boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    var self = this;
    this.authService.isLoggedIn().subscribe({
      next(status) {
        if (status == false) {
          router.navigateByUrl('');
          self.user = null;
        } else {
          self.authService.getUser().then((user) => {
            self.user = user;
          });
        }
      },
      error(msg) {
        console.log('Error Getting AuthService observable: ', msg);
      },
    });
  }

  async logout() {
    await this.authService.logout();
  }

  ngOnInit() {
    this.router.events.pipe().subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const rt = this.getChild(this.activatedRoute);
        rt.data.subscribe((data) => {
          if (data.title)
            this.titleService.setTitle(data.title + ' | Task Manager');
          else this.titleService.setTitle('Task Manager');
          if (data.showLogout) this.showLogout = data.showLogout;
        });
      }
    });
  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
