import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import UseCaseFactory from '../UseCase/UseCaseFactory';

import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import GetTaskByIdUseCase from 'src/UseCase/GetTaskById/GetTaskByIdUseCase';

import SaveTaskUseCase from 'src/UseCase/SaveTask/SaveTaskUseCase';

import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import DeleteTaskUseCase from 'src/UseCase/DeleteTask/DeleteTaskUseCase';

@Controller('/tasks')
export default class TaskController {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  @Get()
  async getAll() {
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return (await this.useCaseFactory.create(GetTaskByIdUseCase)).handle(Number(id));
  }

  @Post()
  async create(@Body() dto: SaveTaskDto) {
    // Vérification de la validité du DTO
    if (!dto.name) throw new BadRequestException('Name is required');
    return (await this.useCaseFactory.create(SaveTaskUseCase)).handle(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: SaveTaskDto) {
    if (!dto.name) throw new BadRequestException('Name is required');
    dto.id = Number(id);
    return (await this.useCaseFactory.create(SaveTaskUseCase)).handle(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return (await this.useCaseFactory.create(DeleteTaskUseCase)).handle(Number(id));
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
