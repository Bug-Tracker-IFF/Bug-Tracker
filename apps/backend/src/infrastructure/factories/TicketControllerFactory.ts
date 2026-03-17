// src/infrastructure/factories/TicketControllerFactory.ts

import { PrismaTicketRepository } from '../database/repositories/PrismaTicketRepository';
import { PrismaUserRepository } from '../database/repositories/PrismaUserRepository';
import { PrismaProjectRepository } from '../database/repositories/PrismaProjectRepository';
import { CreateTicket } from '../../application/use_cases/ticket/CreateTicket';
import { AssignTicket } from '../../application/use_cases/ticket/AssignTicket';
import { UpdateTicketStatus } from '../../application/use_cases/ticket/UpdateTicketStatus';
import { TicketController } from '../../interfaces/controllers/TicketController';

export class TicketControllerFactory {
  static create(): TicketController {
    const ticketRepository = new PrismaTicketRepository();
    const userRepository = new PrismaUserRepository();
    const projectRepository = new PrismaProjectRepository();

    const createTicketUseCase = new CreateTicket(ticketRepository, userRepository, projectRepository);
    const assignTicketUseCase = new AssignTicket(ticketRepository, userRepository);
    const updateTicketStatusUseCase = new UpdateTicketStatus(ticketRepository);

    return new TicketController(createTicketUseCase, assignTicketUseCase, updateTicketStatusUseCase);
  }
}