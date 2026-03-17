// src/domain/repositories/ITicketRepository.ts

import { Ticket, TicketStatus } from "../entities/Ticket";

export interface ITicketRepository {
  findById(id: string): Promise<Ticket | null>;
  findByProject(projectId: string): Promise<Ticket[] | null>;
  save(ticket: Ticket): Promise<Ticket | null>;
  updateStatus(id: string, newStatus: TicketStatus): Promise<Ticket | null>;
  assignTo(ticketId: string, userId: string): Promise<Ticket | null>;
}