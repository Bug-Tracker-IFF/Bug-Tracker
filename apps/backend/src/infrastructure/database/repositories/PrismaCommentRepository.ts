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
  
  async findByTicketId(ticketId: string): Promise<Comment[] | null> {
    const comments = await this.prisma.comment.findMany({
      where: { ticketId },
      orderBy: { createdAt: 'desc' },
      include: { author: true }
    });
    if (comments.length === 0) return null;
    return comments.map(c => new Comment(c.id, c.text, c.authorId, c.ticketId, c.createdAt, c.author ? c.author.name : null));
  }
  async delete(id: string): Promise<boolean> { return true; }
}