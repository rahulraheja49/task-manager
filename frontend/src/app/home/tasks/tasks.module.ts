import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { AddSubtaskComponent } from './add-subtask/add-subtask.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [MyTasksComponent, AddSubtaskComponent, TaskComponent],
  imports: [CommonModule, TasksRoutingModule, FormsModule, ReactiveFormsModule],
})
export class TasksModule {}
