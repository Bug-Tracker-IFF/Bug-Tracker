// src/application/use_cases/ticket/GetAllTicketsByProject.ts

import { ITicketRepository } from "../../../domain/repositories/ITicketRepository";
import { Ticket } from "../../../domain/entities/Ticket";

export class GetAllTicketsByProject {
  constructor(private ticketRepository: ITicketRepository) {}

  public async execute(projectId: string): Promise<Ticket[]> {
    const tickets = await this.ticketRepository.findByProject(projectId);
    return tickets || [];
  }
}
