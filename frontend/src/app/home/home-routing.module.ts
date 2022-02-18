import { NewTaskComponent } from './new-task/new-task.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'Profile', showLogout: true },
      },
      {
        path: 'new-task',
        component: NewTaskComponent,
        data: { title: 'New Task' },
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./tasks/tasks.module').then((m) => m.TasksModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tasks',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
