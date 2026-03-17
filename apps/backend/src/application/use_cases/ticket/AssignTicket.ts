// src/application/use_cases/ticket/AssignTicket.ts

import { ITicketRepository } from "../../../domain/repositories/ITicketRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { AssignTicketInputDTO } from "../../dtos/AssignTicketDTO";

export class AssignTicket {
  constructor(
    private ticketRepository: ITicketRepository,
    private userRepository: IUserRepository
  ) {}

  public async execute(input: AssignTicketInputDTO): Promise<void> {
    const ticket = await this.ticketRepository.findById(input.ticketId);
    if (!ticket) throw new Error("Ticket not found.");

    const assignee = await this.userRepository.findById(input.assigneeId);
    if (!assignee) throw new Error("Assignee (User) not found.");

    // Atualiza o chamado no banco
    await this.ticketRepository.assignTo(input.ticketId, input.assigneeId);
  }
}