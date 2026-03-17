// src/infrastructure/database/repositories/PrismaTicketRepository.ts

import { PrismaClient } from '@prisma/client';
import { ITicketRepository } from '../../../domain/repositories/ITicketRepository';
import { Ticket, TicketStatus } from '../../../domain/entities/Ticket';

export class PrismaTicketRepository implements ITicketRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findById(id: string): Promise<Ticket | null> {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) return null;

    return new Ticket(
      ticket.id,
      ticket.title,
      ticket.description,
      ticket.reporterId,
      ticket.projectId,
      ticket.status as TicketStatus, // Convertendo a string da BD para o nosso Enum
      ticket.assigneeId,
      ticket.createdAt,
      ticket.updatedAt
    );
  }

  async findByProject(projectId: string): Promise<Ticket[] | null> {
    const tickets = await this.prisma.ticket.findMany({
      where: { projectId }
    });

    if (tickets.length === 0) return null;

    return tickets.map(t => new Ticket(
      t.id, t.title, t.description, t.reporterId, t.projectId, 
      t.status as TicketStatus, t.assigneeId, t.createdAt, t.updatedAt
    ));
  }

  async save(ticket: Ticket): Promise<Ticket | null> {
    const createdTicket = await this.prisma.ticket.create({
      data: {
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
        reporterId: ticket.reporterId,
        projectId: ticket.projectId,
        assigneeId: ticket.assigneeId ?? null // O TypeScript trata variáveis opcionais como `undefined` ou o valor definido, enquanto o Prisma exige explicitamente `null` para campos opcionais no banco de dados.
      }
    });

    return new Ticket(
      createdTicket.id, createdTicket.title, createdTicket.description,
      createdTicket.reporterId, createdTicket.projectId, 
      createdTicket.status as TicketStatus, createdTicket.assigneeId, 
      createdTicket.createdAt, createdTicket.updatedAt
    );
  }

  async updateStatus(id: string, newStatus: TicketStatus): Promise<Ticket | null> {
    const updatedTicket = await this.prisma.ticket.update({
      where: { id },
      data: { status: newStatus }
    });

    return new Ticket(
      updatedTicket.id, updatedTicket.title, updatedTicket.description,
      updatedTicket.reporterId, updatedTicket.projectId, 
      updatedTicket.status as TicketStatus, updatedTicket.assigneeId, 
      updatedTicket.createdAt, updatedTicket.updatedAt
    );
  }

  async assignTo(ticketId: string, userId: string): Promise<Ticket | null> {
    const assignedTicket = await this.prisma.ticket.update({
      where: { id: ticketId },
      data: { assigneeId: userId }
    });

    return new Ticket(
      assignedTicket.id, assignedTicket.title, assignedTicket.description,
      assignedTicket.reporterId, assignedTicket.projectId, 
      assignedTicket.status as TicketStatus, assignedTicket.assigneeId, 
      assignedTicket.createdAt, assignedTicket.updatedAt
    );
  }
}