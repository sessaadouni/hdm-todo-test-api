import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import { Task } from '@prisma/client';
import TaskRepository from 'src/Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    if (!dto.name) {
      throw new BadRequestException('Task name is required');
    }

    try {
      if (dto.id) {
        const updatedTask = await this.taskRepository.save({ id: dto.id, name: dto.name }) as unknown as Task;
        return updatedTask;
      } else {
        const newTask = await this.taskRepository.save({ name: dto.name }) as unknown as Task;
        return newTask;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
