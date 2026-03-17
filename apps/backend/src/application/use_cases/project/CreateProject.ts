// src/application/use_cases/project/CreateProject.ts

import { Project } from "../../../domain/entities/Project";
import { IProjectRepository } from "../../../domain/repositories/IProjectRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { CreateProjectInputDTO, CreateProjectOutputDTO } from "../../dtos/CreateProjectDTO";

export class CreateProject {
  constructor(
    private projectRepository: IProjectRepository,
    private userRepository: IUserRepository
  ) {}

  public async execute(input: CreateProjectInputDTO): Promise<CreateProjectOutputDTO> {
    // 1. Verifica se o usuário que será o gerente realmente existe
    const manager = await this.userRepository.findById(input.managerId);
    if (!manager) {
      throw new Error("Manager not found");
    }

    // 2. Regra de Negócio: Apenas GERENTES podem ser donos de projetos
    if (manager.getRole() !== 'GERENTE') {
      throw new Error("Only users with GERENTE role can manage projects");
    }

    // 3. Cria a entidade do projeto (que fará as validações de tamanho de nome, etc)
    const project = new Project("", input.name, input.description, input.managerId);
    
    // 4. Salva no banco de dados usando o repositório
    await this.projectRepository.save(project);

    // 5. Retorna o DTO de saída
    return {
      id: project.id,
      name: project.name,
      managerId: project.managerId,
    };
  }
}