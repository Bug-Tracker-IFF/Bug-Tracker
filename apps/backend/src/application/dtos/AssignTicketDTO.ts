// src/application/dtos/AssignTicketDTO.ts

export interface AssignTicketInputDTO {
    ticketId: string;
    assigneeId: string; // O ID do Desenvolvedor que vai resolver o bug
  }