import { Task } from './task';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];

  constructor() { }

  getAll(): Task[] {
    const list = window.localStorage.getItem('lista_tarefas');
    if (list) {
      this.tasks = JSON.parse(list);
    }
    return this.tasks;
  }

  getById(id: number): Task {
    const taskFound = this.tasks.find((task) => task.id === id);
    return taskFound;
  }

  save(task: Task): Task {
    if (task.id) {
      const taskArr = this.getById(task.id);
      taskArr.description = task.description;
      taskArr.completed = task.completed;
    } else {
      let lastId = 0;
      if (this.tasks.length > 0) {
        lastId = this.tasks[this.tasks.length].id + 1;
      }
      task.id = lastId + 1;
      task.completed = false;
      this.tasks.push(task);
    }
    window.localStorage.setItem('lista_tarefas', JSON.stringify(this.tasks));
    return task;
  }

  delete(id: number) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(taskIndex, 1);
    window.localStorage.setItem('lista_tarefas', JSON.stringify(this.tasks));
  }

}
