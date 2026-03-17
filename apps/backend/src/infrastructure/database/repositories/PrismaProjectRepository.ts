// src/infrastructure/database/repositories/PrismaProjectRepository.ts

import { PrismaClient } from '@prisma/client';
import { IProjectRepository } from '../../../domain/repositories/IProjectRepository';
import { Project } from '../../../domain/entities/Project';

export class PrismaProjectRepository implements IProjectRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findById(id: string): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });
    
    if (!project) return null;
    
    return new Project(
      project.id, 
      project.name, 
      project.description, 
      project.managerId, 
      project.createdAt
    );
  }

  async findAll(): Promise<Project[] | null> {
    const projects = await this.prisma.project.findMany();
    
    if (projects.length === 0) return null;

    return projects.map(p => new Project(p.id, p.name, p.description, p.managerId, p.createdAt));
  }

  async save(project: Project): Promise<Project | null> {
    const createdProject = await this.prisma.project.create({
      data: {
        id: project.id,
        name: project.name,
        description: project.description,
        managerId: project.managerId,
        createdAt: project.createdAt,
      },
    });

    return new Project(
      createdProject.id, 
      createdProject.name, 
      createdProject.description, 
      createdProject.managerId, 
      createdProject.createdAt
    );
  }

  async addMember(projectId: string, userId: string): Promise<void> {
    await this.prisma.project.update({
      where: { id: projectId },
      data: {
        members: {
          connect: { id: userId } // O Prisma faz a ligação automática na tabela intermédia
        }
      }
    });
  }

  async isMember(projectId: string, userId: string): Promise<boolean> {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        members: {
          some: { id: userId }
        }
      }
    });
    
    return project !== null;
  }
}