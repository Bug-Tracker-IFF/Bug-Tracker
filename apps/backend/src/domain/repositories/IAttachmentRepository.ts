// src/domain/repositories/IAttachmentRepository.ts

import { Attachment } from "../entities/Attachment";

export interface IAttachmentRepository {
  
  save(attachment: Attachment): Promise<Attachment | null>;
  findByTicketId(ticketId: string): Promise<Attachment[] | null>;
  findById(id: string): Promise<Attachment | null>;
  delete(id: string): Promise<boolean>;
}