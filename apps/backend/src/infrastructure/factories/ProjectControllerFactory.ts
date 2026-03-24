// src/infrastructure/factories/ProjectControllerFactory.ts

import { PrismaProjectRepository } from '../database/repositories/PrismaProjectRepository';
import { PrismaUserRepository } from '../database/repositories/PrismaUserRepository';
import { CreateProject } from '../../application/use_cases/project/CreateProject';
import { ProjectController } from '../../interfaces/controllers/api/ProjectController';

export class ProjectControllerFactory {
  static create(): ProjectController {
    // 1. Instancia os repositórios necessários
    const projectRepository = new PrismaProjectRepository();
    const userRepository = new PrismaUserRepository(); // Precisamos dele para validar se o gerente existe

    // 2. Instancia o Caso de Uso injetando os repositórios
    const createProjectUseCase = new CreateProject(projectRepository, userRepository);

    // 3. Retorna o Controller pronto para uso
    return new ProjectController(createProjectUseCase);
  }
}