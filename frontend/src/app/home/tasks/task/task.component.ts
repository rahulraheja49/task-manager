import { Router } from '@angular/router';
import { HomeService } from './../../home.service';
import { Component, Input, OnInit } from '@angular/core';
import { TaskResponse } from '../../models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input()
  config: TaskResponse;

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit() {}
}
