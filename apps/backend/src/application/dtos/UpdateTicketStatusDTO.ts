// src/application/dtos/UpdateTicketStatusDTO.ts

import { TicketStatus } from "../../domain/entities/Ticket";

export interface UpdateTicketStatusInputDTO {
  ticketId: string;
  newStatus: TicketStatus;
}