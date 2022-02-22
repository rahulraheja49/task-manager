import { TaskResponse } from './../../models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../home.service';
import { Tasks } from '../../models';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss'],
})
export class MyTasksComponent implements OnInit {
  tasks: Tasks;
  loaded: boolean = false;
  select: string = 'current';

  constructor(private homeSevice: HomeService, private router: Router) {
    this.loaded = false;
    var self = this;
    this.homeSevice.getTasksObservable().subscribe({
      next: (tasks: Tasks) => {
        if (self.tasks !== tasks) self.tasks = tasks;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggle(state: string) {
    this.select = state;
  }

  openTask(id: TaskResponse) {
    this.router.navigateByUrl(`home/tasks/add-subtask/${id}`);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.loaded = true;
  }
}
