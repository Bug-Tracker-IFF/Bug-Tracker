// src/infrastructure/factories/ProjectViewControllerFactory.ts
import { PrismaProjectRepository } from '../database/repositories/PrismaProjectRepository';
import { PrismaUserRepository } from '../database/repositories/PrismaUserRepository';
import { PrismaTicketRepository } from '../database/repositories/PrismaTicketRepository';
import { GetProjectsByUser } from '../../application/use_cases/project/GetProjectsByUser';
import { GetProjectById } from '../../application/use_cases/project/GetProjectById';
import { CreateProject } from '../../application/use_cases/project/CreateProject';
import { GetAllTicketsByProject } from '../../application/use_cases/ticket/GetAllTicketsByProject';
import { AddMemberToProject } from '../../application/use_cases/project/AddMemberToProject';
import { ProjectViewController } from '../../interfaces/controllers/views/ProjectViewController';

export class ProjectViewControllerFactory {
  static create(): ProjectViewController {
    const projectRepo = new PrismaProjectRepository();
    const userRepo = new PrismaUserRepository();
    const ticketRepo = new PrismaTicketRepository();

    const getProjectsByUser = new GetProjectsByUser(projectRepo);
    const getProjectById = new GetProjectById(projectRepo);
    const createProject = new CreateProject(projectRepo, userRepo);
    const getTickets = new GetAllTicketsByProject(ticketRepo);
    const addMemberToProject = new AddMemberToProject(projectRepo, userRepo);

    return new ProjectViewController(getProjectsByUser, getProjectById, createProject, getTickets, addMemberToProject, userRepo);
  }
}
