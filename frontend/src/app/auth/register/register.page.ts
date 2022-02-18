import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  getFormValidationErrors,
  checkPasswords,
  requirePhoneOrEmail,
} from 'src/app/_helpers/get-form-validation-errors';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  isSubmitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        email: [
          null,
          [Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required, Validators.minLength(6)]],
        fullName: ['', [Validators.required, Validators.minLength(2)]],
      },
      { validators: checkPasswords, requirePhoneOrEmail }
    );
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  register() {
    this.isSubmitted = true;
    if (!this.registerForm.valid) {
      getFormValidationErrors(this.registerForm).forEach((error) =>
        this.presentToast(error.message)
      );
    } else {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          setTimeout(() => {
            this.router.navigateByUrl('');
          }, 100);
        },
        error: (error) => {
          console.log(error);
          this.presentToast(error.error?.msg || error.message);
          // error.error.msg would be error messages sent by the server
          // while error.message is where HttpResponseError stores its error message
        },
      });
    }
  }
}
