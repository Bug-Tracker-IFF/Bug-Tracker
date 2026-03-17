// src/application/use_cases/ticket/UpdateTicketStatus.ts

import { ITicketRepository } from "../../../domain/repositories/ITicketRepository";
import { TicketStatus } from "../../../domain/entities/Ticket";
import { UpdateTicketStatusInputDTO } from "../../dtos/UpdateTicketStatusDTO";

export class UpdateTicketStatus {
  constructor(private ticketRepository: ITicketRepository) {}

  public async execute(input: UpdateTicketStatusInputDTO): Promise<void> {
    const ticket = await this.ticketRepository.findById(input.ticketId);
    if (!ticket) throw new Error("Ticket not found.");

    const currentStatus = ticket.status;
    const nextStatus = input.newStatus;

    // Define quais são as transições permitidas para cada status atual
    const allowedTransitions: Record<TicketStatus, TicketStatus[]> = {
      [TicketStatus.ABERTO]: [TicketStatus.EM_ANDAMENTO],
      [TicketStatus.EM_ANDAMENTO]: [TicketStatus.PARA_TESTAR],
      // Se o teste falhar, o QA devolve para EM_ANDAMENTO. Se passar, vai para FECHADO.
      [TicketStatus.PARA_TESTAR]: [TicketStatus.EM_ANDAMENTO, TicketStatus.FECHADO],
      [TicketStatus.FECHADO]: [] 
    };

    // Verifica se a transição solicitada está na lista de transições permitidas
    const canTransition = allowedTransitions[currentStatus].includes(nextStatus);

    if (!canTransition) {
      throw new Error(`State Machine Error: Cannot transition from ${currentStatus} to ${nextStatus}.`);
    }

    // Se passou na validação da Máquina de Estados, salva no banco
    await this.ticketRepository.updateStatus(input.ticketId, nextStatus);
  }
}