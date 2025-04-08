import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask(title, description);
  }

  @Put(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('completed') completed: boolean,
  ): Task {
    return this.tasksService.updateTask(id, title, description, completed);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number): { success: boolean } {
    const result = this.tasksService.deleteTask(id);
    return { success: result };
  }
}