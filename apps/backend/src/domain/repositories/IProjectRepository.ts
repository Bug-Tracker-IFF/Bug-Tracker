// src/domain/repositories/IProjectRepository.ts

import { Project } from "../entities/Project";

export interface IProjectRepository {
  findById(id: string): Promise<Project | null>;
  findAll(): Promise<Project[] | null>;
  save(project: Project): Promise<Project | null>;
  // Métodos específicos para gerenciar membros do projeto
  addMember(projectId: string, userId: string): Promise<void>;
  isMember(projectId: string, userId: string): Promise<boolean>;
}