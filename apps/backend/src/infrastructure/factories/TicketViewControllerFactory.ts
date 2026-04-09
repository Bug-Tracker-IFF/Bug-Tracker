// src/infrastructure/factories/TicketViewControllerFactory.ts
import { PrismaTicketRepository } from '../database/repositories/PrismaTicketRepository';
import { PrismaUserRepository } from '../database/repositories/PrismaUserRepository';
import { PrismaProjectRepository } from '../database/repositories/PrismaProjectRepository';
import { PrismaCommentRepository } from '../database/repositories/PrismaCommentRepository';
import { PrismaAttachmentRepository } from '../database/repositories/PrismaAttachmentRepository';
import { CreateTicket } from '../../application/use_cases/ticket/CreateTicket';
import { GetTicketById } from '../../application/use_cases/ticket/GetTicketById';
import { UpdateTicketStatus } from '../../application/use_cases/ticket/UpdateTicketStatus';
import { AddComment } from '../../application/use_cases/ticket/AddComment';
import { AddAttachment } from '../../application/use_cases/ticket/AddAttachment';
import { GetCommentsByTicket } from '../../application/use_cases/ticket/GetCommentsByTicket';
import { GetAttachmentsByTicket } from '../../application/use_cases/ticket/GetAttachmentsByTicket';
import { AssignTicket } from '../../application/use_cases/ticket/AssignTicket';
import { TicketViewController } from '../../interfaces/controllers/views/TicketViewController';

export class TicketViewControllerFactory {
  static create(): TicketViewController {
    const ticketRepo = new PrismaTicketRepository();
    const userRepo = new PrismaUserRepository();
    const projectRepo = new PrismaProjectRepository();
    const commentRepo = new PrismaCommentRepository();
    const attachmentRepo = new PrismaAttachmentRepository();

    const createTicket = new CreateTicket(ticketRepo, userRepo, projectRepo);
    const getTicketById = new GetTicketById(ticketRepo);
    const updateTicketStatus = new UpdateTicketStatus(ticketRepo);
    const addComment = new AddComment(commentRepo, ticketRepo);
    const addAttachment = new AddAttachment(attachmentRepo, ticketRepo);
    const getCommentsByTicket = new GetCommentsByTicket(commentRepo);
    const getAttachmentsByTicket = new GetAttachmentsByTicket(attachmentRepo);
    const assignTicket = new AssignTicket(ticketRepo, userRepo);

    return new TicketViewController(createTicket, getTicketById, updateTicketStatus, addComment, addAttachment, getCommentsByTicket, getAttachmentsByTicket, assignTicket, userRepo);
  }
}
