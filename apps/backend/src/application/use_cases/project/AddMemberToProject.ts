// src/application/use_cases/project/AddMemberToProject.ts

import { IProjectRepository } from "../../../domain/repositories/IProjectRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { AddMemberToProjectInputDTO } from "../../dtos/AddMemberToProjectDTO";

export class AddMemberToProject {
  constructor(
    private projectRepository: IProjectRepository,
    private userRepository: IUserRepository
  ) {}

  public async execute(input: AddMemberToProjectInputDTO): Promise<void> {
    // 1. Verifica se o projeto existe
    const project = await this.projectRepository.findById(input.projectId);
    if (!project) {
      throw new Error("Project not found.");
    }

    // 2. Regra de Negócio de Segurança: Quem está pedindo para adicionar é o dono do projeto?
    if (project.managerId !== input.requesterId) {
      throw new Error("Only the project manager can add members to this project.");
    }

    // 3. Verifica se o usuário que será adicionado existe
    const userToBeAdded = await this.userRepository.findById(input.userId);
    if (!userToBeAdded) {
      throw new Error("User to be added not found.");
    }

    // 4. Verifica se o usuário já não é membro (para não duplicar dados)
    const isAlreadyMember = await this.projectRepository.isMember(input.projectId, input.userId);
    if (isAlreadyMember) {
      throw new Error("User is already a member of this project.");
    }

    // 5. Adiciona o membro chamando o repositório
    await this.projectRepository.addMember(input.projectId, input.userId);
  }
}