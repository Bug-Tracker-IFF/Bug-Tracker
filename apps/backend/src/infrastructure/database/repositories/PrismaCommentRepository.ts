import { PrismaClient } from '@prisma/client';
import { ICommentRepository } from '../../../domain/repositories/ICommentRepository';
import { Comment } from '../../../domain/entities/Comment';

export class PrismaCommentRepository implements ICommentRepository {
  private prisma = new PrismaClient();

  async save(comment: Comment): Promise<Comment | null> {
    const created = await this.prisma.comment.create({
      data: {
        id: comment.id,
        text: comment.text,
        authorId: comment.authorId,
        ticketId: comment.ticketId,
        createdAt: comment.createdAt
      }
    });
    return new Comment(created.id, created.text, created.authorId, created.ticketId, created.createdAt);
  }
  
  async findByTicketId(ticketId: string): Promise<Comment[] | null> { return null; }
  async delete(id: string): Promise<boolean> { return true; }
}