// src/application/use_cases/project/GetProjectsByUser.ts

import { IProjectRepository } from "../../../domain/repositories/IProjectRepository";
import { Project } from "../../../domain/entities/Project";

export class GetProjectsByUser {
  constructor(private projectRepository: IProjectRepository) {}

  public async execute(userId: string): Promise<Project[]> {
    const projects = await this.projectRepository.findByUser(userId);
    return projects || [];
  }
}
