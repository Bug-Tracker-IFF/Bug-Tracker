import { Attachment } from "../../../domain/entities/Attachment";
import { IAttachmentRepository } from "../../../domain/repositories/IAttachmentRepository";
import { ITicketRepository } from "../../../domain/repositories/ITicketRepository";

export class AddAttachment {
  constructor(private attachmentRepo: IAttachmentRepository, private ticketRepo: ITicketRepository) {}

  async execute(input: { ticketId: string; fileName: string; filePath: string; size: number }): Promise<void> {
    const ticket = await this.ticketRepo.findById(input.ticketId);
    if (!ticket) throw new Error("Ticket not found.");
    if (ticket.status === 'FECHADO') throw new Error("Cannot add attachments to a closed ticket.");

    const attachment = new Attachment("", input.fileName, input.filePath, input.size, input.ticketId);
    await this.attachmentRepo.save(attachment);
  }
}