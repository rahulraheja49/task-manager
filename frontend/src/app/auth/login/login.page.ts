import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';
import { getFormValidationErrors } from 'src/app/_helpers/get-form-validation-errors';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder,
    public toastController: ToastController
  ) {}

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  login() {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      getFormValidationErrors(this.loginForm).forEach((error) =>
        this.presentToast(error.message)
      );
    } else {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          setTimeout(() => {
            this.router.navigateByUrl('');
          }, 100);
        },
        error: (error) => {
          console.log(error);
          this.presentToast(error.error?.msg || error.message || error.msg);
          // error.error.msg would be error messages sent by the server
          // while error.message is where HttpResponseError stores its error message
        },
      });
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(/([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})$/),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
