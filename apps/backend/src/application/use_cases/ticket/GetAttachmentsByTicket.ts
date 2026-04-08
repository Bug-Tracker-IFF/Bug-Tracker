import { IAttachmentRepository } from "../../../domain/repositories/IAttachmentRepository";
import { Attachment } from "../../../domain/entities/Attachment";

export class GetAttachmentsByTicket {
  constructor(private attachmentRepository: IAttachmentRepository) {}

  public async execute(ticketId: string): Promise<Attachment[]> {
    const attachments = await this.attachmentRepository.findByTicketId(ticketId);
    return attachments || [];
  }
}
