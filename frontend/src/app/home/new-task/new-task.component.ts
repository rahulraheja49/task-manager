import { HomeService } from './../home.service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { getFormValidationErrors } from 'src/app/_helpers/get-form-validation-errors';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  newTaskForm: FormGroup;
  isSubmitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private homeService: HomeService
  ) {}

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  submit() {
    this.isSubmitted = true;
    console.log('test');

    if (!this.newTaskForm.valid) {
      getFormValidationErrors(this.newTaskForm).forEach((error) =>
        this.presentToast(error.message)
      );
    } else {
      this.homeService.createTask(this.newTaskForm.value).subscribe({
        next: (task) => {
          console.log(task);
          this.router.navigateByUrl(``);
        },
        error: (err) => {
          console.log(err);
          this.presentToast(err.error?.msg || err.message || err.msg);
        },
      });
    }
  }

  ngOnInit() {
    this.newTaskForm = this.formBuilder.group({
      title: [null, []],
      description: [null, []],
    });
  }
}
