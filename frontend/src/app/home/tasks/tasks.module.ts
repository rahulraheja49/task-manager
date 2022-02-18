import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrentTasksComponent } from './current-tasks/current-tasks.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { ArchivedTasksComponent } from './archived-tasks/archived-tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksService } from './tasks.service';

@NgModule({
  declarations: [
    ArchivedTasksComponent,
    CompletedTasksComponent,
    CurrentTasksComponent,
  ],
  imports: [CommonModule, TasksRoutingModule],
  providers: [TasksService],
})
export class TasksModule {}
