import { Comment } from "../../../domain/entities/Comment";
import { ICommentRepository } from "../../../domain/repositories/ICommentRepository";
import { ITicketRepository } from "../../../domain/repositories/ITicketRepository";

export class AddComment {
  constructor(private commentRepo: ICommentRepository, private ticketRepo: ITicketRepository) {}

  async execute(input: { ticketId: string; text: string; authorId: string }): Promise<void> {
    const ticket = await this.ticketRepo.findById(input.ticketId);
    if (!ticket) throw new Error("Ticket not found.");

    const comment = new Comment("", input.text, input.authorId, input.ticketId);
    await this.commentRepo.save(comment);
  }
}