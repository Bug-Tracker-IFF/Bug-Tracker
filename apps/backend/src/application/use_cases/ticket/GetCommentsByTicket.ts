import { ICommentRepository } from "../../../domain/repositories/ICommentRepository";
import { Comment } from "../../../domain/entities/Comment";

export class GetCommentsByTicket {
  constructor(private commentRepository: ICommentRepository) {}

  public async execute(ticketId: string): Promise<Comment[]> {
    const comments = await this.commentRepository.findByTicketId(ticketId);
    return comments || [];
  }
}
