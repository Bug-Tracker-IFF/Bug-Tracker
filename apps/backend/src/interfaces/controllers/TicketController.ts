// src/interfaces/controllers/TicketController.ts

import { Request, Response } from 'express';
import { CreateTicket } from '../../application/use_cases/ticket/CreateTicket';
import { AssignTicket } from '../../application/use_cases/ticket/AssignTicket';
import { UpdateTicketStatus } from '../../application/use_cases/ticket/UpdateTicketStatus';

export class TicketController {
  constructor(
    private createTicket: CreateTicket,
    private assignTicket: AssignTicket,
    private updateTicketStatus: UpdateTicketStatus 
  ) {}

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const inputDTO = req.body;
      const outputDTO = await this.createTicket.execute(inputDTO);
      return res.status(201).json(outputDTO);
    } catch (error) {
        if (error instanceof Error) return res.status(400).json({ error: error.message });
        return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async assign(req: Request, res: Response): Promise<Response> {
    try {
      await this.assignTicket.execute({
        ticketId: req.params.id as string, 
        assigneeId: req.body.assigneeId
      });
      return res.status(200).json({ message: "Ticket assigned successfully." });
    } catch (error) {
      if (error instanceof Error) return res.status(400).json({ error: error.message });
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async updateStatus(req: Request, res: Response): Promise<Response> {
    try {
      await this.updateTicketStatus.execute({
        ticketId: req.params.id as string, 
        newStatus: req.body.newStatus
      });
      return res.status(200).json({ message: "Ticket status updated successfully." });
    } catch (error) {
      if (error instanceof Error) return res.status(400).json({ error: error.message });
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}