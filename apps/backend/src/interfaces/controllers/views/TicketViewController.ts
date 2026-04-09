// src/interfaces/controllers/views/TicketViewController.ts
import { Request, Response } from 'express';
import { CreateTicket } from '../../../application/use_cases/ticket/CreateTicket';
import { GetTicketById } from '../../../application/use_cases/ticket/GetTicketById';
import { UpdateTicketStatus } from '../../../application/use_cases/ticket/UpdateTicketStatus';
import { AddComment } from '../../../application/use_cases/ticket/AddComment';
import { AddAttachment } from '../../../application/use_cases/ticket/AddAttachment';
import { GetCommentsByTicket } from '../../../application/use_cases/ticket/GetCommentsByTicket';
import { GetAttachmentsByTicket } from '../../../application/use_cases/ticket/GetAttachmentsByTicket';
import { AssignTicket } from '../../../application/use_cases/ticket/AssignTicket';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';

export class TicketViewController {
    constructor(
        private createTicketUseCase: CreateTicket,
        private getTicketById: GetTicketById,
        private updateTicketStatus: UpdateTicketStatus,
        private addCommentUseCase: AddComment,
        private addAttachmentUseCase: AddAttachment,
        private getCommentsByTicket: GetCommentsByTicket,
        private getAttachmentsByTicket: GetAttachmentsByTicket,
        private assignTicketUseCase: AssignTicket,
        private userRepository: IUserRepository
    ) {}

    public createForm(req: Request, res: Response) {
        if (!req.cookies || !req.cookies.user) return res.redirect('/login');
        const user = JSON.parse(req.cookies.user);
        const projectId = req.params.projectId;

        res.render('tickets/CreateTicket.ejs', { user, projectId, error: null });
    }

    public async create(req: Request, res: Response) {
        if (!req.cookies || !req.cookies.user) return res.redirect('/login');
        const user = JSON.parse(req.cookies.user);
        const projectId = req.params.projectId;

        try {
            const { title, description } = req.body;
            await this.createTicketUseCase.execute({ 
                title, 
                description, 
                projectId, 
                reporterId: user.id 
            });
            res.redirect(`/projects/${projectId}`);
        } catch (e: any) {
            res.render('tickets/CreateTicket.ejs', { user, projectId, error: "Erro ao reportar bug: " + e.message });
        }
    }

    public async show(req: Request, res: Response) {
        if (!req.cookies || !req.cookies.user) return res.redirect('/login');
        const user = JSON.parse(req.cookies.user);
        const { error, success } = req.query;
        
        try {
            const ticket = await this.getTicketById.execute(req.params.id);
            const comments = await this.getCommentsByTicket.execute(req.params.id);
            const attachments = await this.getAttachmentsByTicket.execute(req.params.id);
            res.render('tickets/TicketDetails.ejs', { ticket, comments, attachments, user, error, success });
        } catch (e: any) {
            res.status(404).send("Chamado não encontrado");
        }
    }

    public async updateStatus(req: Request, res: Response) {
        if (!req.cookies || !req.cookies.user) return res.redirect('/login');
        const user = JSON.parse(req.cookies.user);
        
        try {
            const { newStatus } = req.body;
            await this.updateTicketStatus.execute({ 
                ticketId: req.params.id, 
                newStatus,
                requesterId: user.id,
                requesterRole: user.role
            } as any);
            res.redirect(`/tickets/${req.params.id}?success=Status+alterado+com+sucesso`);
        } catch (e: any) {
            res.redirect(`/tickets/${req.params.id}?error=${encodeURIComponent(e.message)}`);
        }
    }

    public async assign(req: Request, res: Response) {
        if (!req.cookies || !req.cookies.user) return res.redirect('/login');
        const user = JSON.parse(req.cookies.user);
        
        try {
            const { assigneeEmail } = req.body;
            let assigneeId = user.id; 
            
            if (user.role === 'GERENTE' && assigneeEmail) {
                const assigneeTarget = await this.userRepository.findByEmail(assigneeEmail);
                if (!assigneeTarget) throw new Error("Usuário (E-mail) não encontrado.");
                assigneeId = assigneeTarget.id;
            }
            
            await this.assignTicketUseCase.execute({ ticketId: req.params.id, requesterId: user.id, assigneeId: assigneeId } as any);
            await this.updateTicketStatus.execute({ 
                ticketId: req.params.id, 
                newStatus: 'EM_ANDAMENTO',
                requesterId: user.id,
                requesterRole: user.role
            } as any);

            res.redirect(`/tickets/${req.params.id}?success=Chamado+atribuído+e+em+andamento`);
        } catch (e: any) {
            res.redirect(`/tickets/${req.params.id}?error=${encodeURIComponent(e.message)}`);
        }
    }

    public async addComment(req: Request, res: Response) {
        if (!req.cookies || !req.cookies.user) return res.redirect('/login');
        const user = JSON.parse(req.cookies.user);
        
        try {
            const { text } = req.body;
            await this.addCommentUseCase.execute({ ticketId: req.params.id, text, authorId: user.id });
            res.redirect(`/tickets/${req.params.id}?success=Comentário+adicionado`);
        } catch (e: any) {
            res.redirect(`/tickets/${req.params.id}?error=${encodeURIComponent(e.message)}`);
        }
    }

    public async addAttachment(req: Request, res: Response) {
        if (!req.cookies || !req.cookies.user) return res.redirect('/login');
        const user = JSON.parse(req.cookies.user);
        
        try {
            const { fileName, filePath } = req.body;
            await this.addAttachmentUseCase.execute({ ticketId: req.params.id, fileName, filePath, size: 0 }); // size is 0 for links
            res.redirect(`/tickets/${req.params.id}?success=Anexo+vinculado`);
        } catch (e: any) {
            res.redirect(`/tickets/${req.params.id}?error=${encodeURIComponent(e.message)}`);
        }
    }
}
