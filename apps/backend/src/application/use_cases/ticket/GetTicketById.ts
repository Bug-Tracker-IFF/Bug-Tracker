// src/application/use_cases/ticket/GetTicketById.ts

import { ITicketRepository } from "../../../domain/repositories/ITicketRepository";
import { Ticket } from "../../../domain/entities/Ticket";

export class GetTicketById {
  constructor(private ticketRepository: ITicketRepository) {}

  public async execute(ticketId: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findById(ticketId);
    if (!ticket) throw new Error("Ticket not found");
    return ticket;
  }
}
