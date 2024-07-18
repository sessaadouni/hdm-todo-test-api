import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';

export default class DeleteTask implements UseCase<Promise<boolean>, [id: number]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(id: number): Promise<boolean> {
    try {
      const task = await this.taskRepository.findById(id);

      if (!task) throw new NotFoundException(`La tâche n'existe pas.`);

      await this.taskRepository.delete(id);
      return true;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error('Erreur durant la suppression de la tâche :', error);
      throw new BadRequestException('Erreur durant la suppression de la tâche.');
    }
  }
}