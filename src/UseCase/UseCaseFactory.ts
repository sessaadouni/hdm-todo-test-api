import { Injectable } from '@nestjs/common';
import ServiceFactory from '../ServiceFactory';
import DeleteTaskUseCase from './DeleteTask/DeleteTaskUseCase';
import GetAllTasksUseCase from './GetAllTasks/GetAllTasksUseCase';
import SaveTaskUseCase from './SaveTask/SaveTaskUseCase';
import GetTaskByIdUseCase from './GetTaskById/GetTaskByIdUseCase';

type UseCases = GetAllTasksUseCase | GetTaskByIdUseCase | SaveTaskUseCase | DeleteTaskUseCase;

@Injectable()
export default class UseCaseFactory extends ServiceFactory<UseCases> {}
