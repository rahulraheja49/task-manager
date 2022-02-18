import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivedTasksComponent } from './archived-tasks/archived-tasks.component';
import { CurrentTasksComponent } from './current-tasks/current-tasks.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';

const routes: Routes = [
  {
    path: '',
    component: CurrentTasksComponent,
    data: { title: 'Current Tasks' },
  },
  {
    path: 'completed-tasks',
    component: CompletedTasksComponent,
    data: { title: 'Completed Tasks' },
  },
  {
    path: 'archived-tasks',
    component: ArchivedTasksComponent,
    data: { title: 'Archived Tasks' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
