import { PrismaClient } from '@prisma/client';
import { IAttachmentRepository } from '../../../domain/repositories/IAttachmentRepository';
import { Attachment } from '../../../domain/entities/Attachment';

export class PrismaAttachmentRepository implements IAttachmentRepository {
  private prisma = new PrismaClient();

  async save(attachment: Attachment): Promise<Attachment | null> {
    const created = await this.prisma.attachment.create({
      data: {
        id: attachment.id,
        fileName: attachment.fileName,
        filePath: attachment.filePath,
        size: attachment.size,
        ticketId: attachment.ticketId,
        uploadedAt: attachment.uploadedAt
      }
    });
    return new Attachment(created.id, created.fileName, created.filePath, created.size, created.ticketId, created.uploadedAt);
  }

  async findByTicketId(ticketId: string): Promise<Attachment[] | null> { return null; }
  async findById(id: string): Promise<Attachment | null> { return null; }
  async delete(id: string): Promise<boolean> { return true; }
}