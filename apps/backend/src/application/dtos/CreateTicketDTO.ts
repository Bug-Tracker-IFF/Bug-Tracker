// src/application/dtos/CreateTicketDTO.ts

export interface CreateTicketInputDTO {
    title: string;
    description: string;
    reporterId: string; // O ID do usuário (QA/Membro) que está abrindo o chamado
    projectId: string;  // O ID do projeto onde o bug aconteceu
    assigneeId?: string; // O ID do desenvolvedor que vai resolver (é opcional, pode ser atribuído depois)
  }
  
  export interface CreateTicketOutputDTO {
    id: string;
    title: string;
    description: string;
    status: string;
    reporterId: string;
    projectId: string;
    assigneeId?: string | null;
  }