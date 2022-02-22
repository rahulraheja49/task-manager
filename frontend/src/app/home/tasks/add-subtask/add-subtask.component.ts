import { ToastController } from '@ionic/angular';
import { HomeService } from './../../home.service';
import { SingleTaskResponse, SubtaskCompleteResponse } from './../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-subtask',
  templateUrl: './add-subtask.component.html',
  styleUrls: ['./add-subtask.component.scss'],
})
export class AddSubtaskComponent implements OnInit {
  @Input()
  task_id: string = '';
  task: SingleTaskResponse;
  description: string;

  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
    private toastController: ToastController
  ) {
    this.task_id = activatedRoute.snapshot.paramMap.get('task_id');
    var self = this;
    this.homeService.getTask(self.task_id).subscribe({
      next: (task: SingleTaskResponse) => {
        console.log(task);
        self.task = task;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  addSubtask() {
    if (this.description.length > 0) {
      this.homeService.addSubtask(this.task_id, this.description).subscribe({
        next: (res) => {
          this.task = res;
          this.description = '';
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.presentToast('Description cannot be empty');
    }
  }

  markCompleted(id: string) {
    this.homeService.subtaskComplete(id).subscribe({
      next: (res: SubtaskCompleteResponse) => {
        if (res.taskComplete) {
          this.router.navigateByUrl('home');
        } else {
          this.homeService.getTask(this.task_id).subscribe({
            next: (task: SingleTaskResponse) => {
              console.log(task);
              this.task = task;
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      },
    });
  }

  ngOnInit() {}
}
