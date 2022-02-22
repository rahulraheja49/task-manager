export interface TaskResponse {
  _id: string;
  user: string;
  title: string;
  description: string;
  type: string;
  subtasks: string[];
}

export interface SingleTaskResponse {
  _id: string;
  user: string;
  title: string;
  description: string;
  type: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  subtasks: Subtask[];
}

export interface Subtask {
  _id: string;
  task_id: string;
  description: string;
  complete: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Tasks {
  newTasks: TaskResponse[];
  inprogressTasks: TaskResponse[];
  archivedTasks: TaskResponse[];
  completedTasks: TaskResponse[];
}

export interface SubtaskCompleteResponse {
  updatedSubtask: TaskResponse;
  taskComplete: boolean;
}
