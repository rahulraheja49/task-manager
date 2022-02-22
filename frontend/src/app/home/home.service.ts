import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { BackendConnectService } from 'src/app/_helpers/backend-connect.service';
import {
  TaskResponse,
  Tasks,
  SingleTaskResponse,
  SubtaskCompleteResponse,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private tasksSubject = new BehaviorSubject({});
  private httpOptions: object = {};

  constructor(
    private backend: BackendConnectService,
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    this.authService.isLoggedIn().subscribe({
      next: (status) => {
        if (status == true) {
          this.authService.getHeaderOptions().then((httpOptions) => {
            this.httpOptions = httpOptions;
            this.getTasks();
          });
        }
      },
    });
  }

  private getTasks() {
    if (this.authService.isLoggedInNow())
      this.httpClient
        .get<Tasks>(
          `${this.backend.getAddress()}/task/getTasks`,
          this.httpOptions
        )
        .subscribe((tasks: Tasks) => {
          this.tasksSubject.next(tasks);
          setTimeout(() => this.getTasks(), 10000);
        });
  }

  getTasksObservable() {
    return this.tasksSubject.asObservable();
  }

  getTask(id: string): Observable<SingleTaskResponse> {
    return this.httpClient.get<SingleTaskResponse>(
      `${this.backend.getAddress()}/task?task_id=${id}`,
      this.httpOptions
    );
  }

  subtaskComplete(id: string): Observable<SubtaskCompleteResponse> {
    return this.httpClient.post<SubtaskCompleteResponse>(
      `${this.backend.getAddress()}/task/markSubtaskAsComplete`,
      { subtask_id: id },
      this.httpOptions
    );
  }

  addSubtask(
    task_id: string,
    description: string
  ): Observable<SingleTaskResponse> {
    return this.httpClient.post<SingleTaskResponse>(
      `${this.backend.getAddress()}/task/addSubtask`,
      { task_id, description },
      this.httpOptions
    );
  }

  createTask(task: object): Observable<TaskResponse> {
    return this.httpClient.post<TaskResponse>(
      `${this.backend.getAddress()}/task/create`,
      task,
      this.httpOptions
    );
  }
}
