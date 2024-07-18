import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async findById(id: number) {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }  

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    const { id, ...rest } = data;

    if (id) {
      // Mise à jour de la tâche existante
      return this.prisma.task.update({
        where: { id: id as number },
        data: rest as Prisma.TaskUpdateInput,
      });
    } else {
      // Création d'une nouvelle tâche
      return this.prisma.task.create({
        data: data as Prisma.TaskCreateInput,
      });
    }
  }
}
