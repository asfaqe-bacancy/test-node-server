import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    return task;
  }

  createTask(title: string, description: string): Task {
    const newTask: Task = {
      id: this.idCounter++,
      title,
      description,
      completed: false,
    };
    
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: number, title: string, description: string, completed: boolean): Task {
    const task = this.getTaskById(id);
    if (task) {
      task.title = title || task.title;
      task.description = description || task.description;
      task.completed = completed !== undefined ? completed : task.completed;
    }
    return task;
  }

  deleteTask(id: number): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== id);
    return initialLength !== this.tasks.length;
  }
}