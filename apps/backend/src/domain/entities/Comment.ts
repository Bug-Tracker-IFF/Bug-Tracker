// src/domain/entities/Comment.ts

export class Comment {
    public id: string;
    public text: string;
    public authorId: string; // Quem escreveu o comentário
    public ticketId: string; // Em qual chamado foi comentado
    public createdAt: Date;
  
    constructor(id: string, text: string, authorId: string, ticketId: string, createdAt?: Date) {
      if (!text || text.trim().length === 0) {
        throw new Error("Comment text cannot be empty");
      }
      if (!authorId) throw new Error("Comment must have an author");
      if (!ticketId) throw new Error("Comment must be associated with a ticket");
  
      this.id = id || "comm-id-" + Date.now();
      this.text = text;
      this.authorId = authorId;
      this.ticketId = ticketId;
      this.createdAt = createdAt || new Date();
    }
  }