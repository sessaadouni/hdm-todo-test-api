import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class GetTaskByIdUseCase
  implements UseCase<Promise<Task>, [id: number]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findById(id);
      if (!task) {
        throw new BadRequestException(`La tâche n'existe pas.`);
      }
      return task;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Erreur durant la récupération de la tâche :', error);      
      throw new BadRequestException('Erreur durant la récupération de la tâche.');
    }
  }
}