// src/domain/repositories/ICommentRepository.ts

import { Comment } from "../entities/Comment";

export interface ICommentRepository {
  save(comment: Comment): Promise<Comment | null>;
  findByTicketId(ticketId: string): Promise<Comment[] | null>;
  delete(id: string): Promise<boolean>;
}