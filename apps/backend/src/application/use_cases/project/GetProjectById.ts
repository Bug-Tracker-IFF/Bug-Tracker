// src/application/use_cases/project/GetProjectById.ts

import { IProjectRepository } from "../../../domain/repositories/IProjectRepository";
import { Project } from "../../../domain/entities/Project";

export class GetProjectById {
  constructor(private projectRepository: IProjectRepository) {}

  public async execute(projectId: string): Promise<Project> {
    const project = await this.projectRepository.findById(projectId);
    if (!project) throw new Error("Project not found");
    return project;
  }
}
