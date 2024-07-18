import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';
import { Task } from '@prisma/client';

@Injectable()
export default class DeleteTaskUseCase implements UseCase<Promise<Task>, [id: number]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findById(id);
      if (!task) throw new NotFoundException(`Task with ID ${id} not found.`);

      return await this.taskRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete the task due to an internal error.');
    }
  }
}
