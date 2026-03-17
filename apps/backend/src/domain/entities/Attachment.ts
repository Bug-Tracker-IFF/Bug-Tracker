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
      if (!fileName) throw new Error("File name is required");
      if (!filePath) throw new Error("File path is required");
      if (!ticketId) throw new Error("Attachment must belong to a ticket");
  
      // Validação simples de extensão de imagem (opcional, mas recomendada)
      const lowerName = fileName.toLowerCase();
      if (!lowerName.endsWith('.png') && !lowerName.endsWith('.jpg') && !lowerName.endsWith('.jpeg')) {
          throw new Error("Only image files (.png, .jpg, .jpeg) are allowed");
      }
  
      this.id = id || "att-id-" + Date.now();
      this.fileName = fileName;
      this.filePath = filePath;
      this.size = size;
      this.ticketId = ticketId;
      this.uploadedAt = uploadedAt || new Date();
    }
  }