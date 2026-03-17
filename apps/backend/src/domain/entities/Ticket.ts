// src/domain/entities/Ticket.ts

export enum TicketStatus {
    ABERTO = 'ABERTO',
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    PARA_TESTAR = 'PARA_TESTAR',
    FECHADO = 'FECHADO'
  }
  
  export class Ticket {
    public id: string;
    public title: string;
    public description: string;
    public status: TicketStatus;
    public reporterId: string; // Quem criou (User)
    public projectId: string;  // A qual projeto pertence
    public assigneeId?: string | null; // A quem foi atribuído (opcional)
    public createdAt: Date;
    public updatedAt: Date;
  
    constructor(
      id: string, title: string, description: string, reporterId: string, 
      projectId: string, status?: TicketStatus, assigneeId?: string | null, 
      createdAt?: Date, updatedAt?: Date
    ) {
      if (!title) throw new Error('Ticket title is required');
      if (!reporterId) throw new Error('Ticket must have a reporter');
      if (!projectId) throw new Error('Ticket must be associated with a project');
  
      this.id = id || "tick-id-" + Date.now();
      this.title = title;
      this.description = description;
      this.reporterId = reporterId;
      this.projectId = projectId;
      this.status = status || TicketStatus.ABERTO;
      this.assigneeId = assigneeId || null;
      this.createdAt = createdAt || new Date();
      this.updatedAt = updatedAt || new Date();
    }
}