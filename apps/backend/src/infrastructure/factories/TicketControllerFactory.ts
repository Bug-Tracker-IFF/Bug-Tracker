// src/infrastructure/factories/TicketControllerFactory.ts

import { PrismaTicketRepository } from '../database/repositories/PrismaTicketRepository';
import { PrismaUserRepository } from '../database/repositories/PrismaUserRepository';
import { PrismaProjectRepository } from '../database/repositories/PrismaProjectRepository';
import { PrismaCommentRepository } from '../database/repositories/PrismaCommentRepository';
import { PrismaAttachmentRepository } from '../database/repositories/PrismaAttachmentRepository';

import { CreateTicket } from '../../application/use_cases/ticket/CreateTicket';
import { AssignTicket } from '../../application/use_cases/ticket/AssignTicket';
import { UpdateTicketStatus } from '../../application/use_cases/ticket/UpdateTicketStatus';
import { AddComment } from '../../application/use_cases/ticket/AddComment';
import { AddAttachment } from '../../application/use_cases/ticket/AddAttachment';

import { TicketController } from '../../interfaces/controllers/api/TicketController';

export class TicketControllerFactory {
  static create(): TicketController {
    // 1. Instanciamos todos os repositórios (acesso ao banco) necessários
    const ticketRepository = new PrismaTicketRepository();
    const userRepository = new PrismaUserRepository();
    const projectRepository = new PrismaProjectRepository();
    const commentRepository = new PrismaCommentRepository();
    const attachmentRepository = new PrismaAttachmentRepository();

    // 2. Instanciamos os Casos de Uso injetando os repositórios corretos
    const createTicketUseCase = new CreateTicket(ticketRepository, userRepository, projectRepository);
    const assignTicketUseCase = new AssignTicket(ticketRepository, userRepository);
    const updateTicketStatusUseCase = new UpdateTicketStatus(ticketRepository);
    const addCommentUseCase = new AddComment(commentRepository, ticketRepository);
    const addAttachmentUseCase = new AddAttachment(attachmentRepository, ticketRepository);

    // 3. Montamos o Controller injetando os 5 Casos de Uso nele
    return new TicketController(
      createTicketUseCase, 
      assignTicketUseCase, 
      updateTicketStatusUseCase,
      addCommentUseCase,
      addAttachmentUseCase
    );
  }
}