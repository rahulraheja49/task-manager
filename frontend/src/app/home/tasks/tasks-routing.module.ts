import { AddSubtaskComponent } from './add-subtask/add-subtask.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'my-tasks',
    component: MyTasksComponent,
    data: { title: 'Tasks' },
  },
  {
    path: 'add-subtask/:task_id',
    component: AddSubtaskComponent,
    data: { title: 'Task Details' },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'my-tasks',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
