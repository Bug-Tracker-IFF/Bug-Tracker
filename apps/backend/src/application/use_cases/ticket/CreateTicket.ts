// src/application/use_cases/ticket/CreateTicket.ts

import { Ticket, TicketStatus } from "../../../domain/entities/Ticket";
import { ITicketRepository } from "../../../domain/repositories/ITicketRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IProjectRepository } from "../../../domain/repositories/IProjectRepository";
import { CreateTicketInputDTO, CreateTicketOutputDTO } from "../../dtos/CreateTicketDTO";

export class CreateTicket {
  constructor(
    private ticketRepository: ITicketRepository,
    private userRepository: IUserRepository,
    private projectRepository: IProjectRepository
  ) {}

  public async execute(input: CreateTicketInputDTO): Promise<CreateTicketOutputDTO> {
    // 1. Verifica se o usuário que está abrindo o chamado (reporter) realmente existe
    const reporter = await this.userRepository.findById(input.reporterId);
    if (!reporter) {
      throw new Error("Reporter (User) not found.");
    }

    // 2. Verifica se o projeto onde o bug está sendo reportado existe
    const project = await this.projectRepository.findById(input.projectId);
    if (!project) {
      throw new Error("Project not found.");
    }

    // 3. Verifica se o desenvolvedor atribuído (assignee) existe, caso tenha sido enviado
    if (input.assigneeId) {
      const assignee = await this.userRepository.findById(input.assigneeId);
      if (!assignee) {
        throw new Error("Assignee (User) not found.");
      }
    }

    // 4. Instancia a entidade de Domínio (que vai validar se tem título, etc)
    const ticket = new Ticket(
      "", // ID vazio, a entidade ou o banco vai gerar
      input.title,
      input.description,
      input.reporterId,
      input.projectId,
      TicketStatus.ABERTO, // Todo chamado recém-criado nasce com status ABERTO
      input.assigneeId
    );

    // 5. Salva o chamado através do contrato (interface) do repositório
    await this.ticketRepository.save(ticket);

    // 6. Retorna os dados formatados na saída
    return {
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      reporterId: ticket.reporterId,
      projectId: ticket.projectId,
      assigneeId: ticket.assigneeId ?? null, // Garantir que seja null se for undefined
    };
  }
}