// src/domain/entities/Attachment.ts

export class Attachment {
    public id: string;
    public fileName: string;
    public filePath: string; // Onde a imagem está salva
    public size: number;     // Tamanho em bytes
    public ticketId: string; // A qual chamado essa imagem pertence
    public uploadedAt: Date;
  
    constructor(
      id: string, fileName: string, filePath: string, size: number, 
      ticketId: string, uploadedAt?: Date
    ) {
      if (!fileName && !filePath) throw new Error("At least one field (Log or Path) is required.");
      if (!ticketId) throw new Error("Attachment must belong to a ticket");
  
      this.id = id || "att-id-" + Date.now();
      this.fileName = fileName;
      this.filePath = filePath;
      this.size = size;
      this.ticketId = ticketId;
      this.uploadedAt = uploadedAt || new Date();
    }
  }