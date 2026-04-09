// src/interfaces/controllers/views/ProjectViewController.ts
import { Request, Response } from 'express';
import { GetProjectsByUser } from '../../../application/use_cases/project/GetProjectsByUser';
import { GetProjectById } from '../../../application/use_cases/project/GetProjectById';
import { CreateProject } from '../../../application/use_cases/project/CreateProject';
import { GetAllTicketsByProject } from '../../../application/use_cases/ticket/GetAllTicketsByProject';
import { AddMemberToProject } from '../../../application/use_cases/project/AddMemberToProject';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';

export class ProjectViewController {
    constructor(
        private getProjectsByUser: GetProjectsByUser,
        private getProjectById: GetProjectById,
        private createProjectUseCase: CreateProject,
        private getAllTicketsByProject: GetAllTicketsByProject,
        private addMemberToProject: AddMemberToProject,
        private userRepository: IUserRepository
    ) {}

    public async list(req: Request, res: Response) {
        if (!req.cookies || !req.cookies.user) return res.redirect('/login');
        const user = JSON.parse(req.cookies.user);
        
        try {
            const projects = await this.getProjectsByUser.execute(user.id);
            res.render('projects/Dashboard.ejs', { projects, user });
        } catch (e) {
            res.status(500).send("Erro ao carregar projetos");
        }
    }

    public async show(req: Request, res: Response) {
        if (!req.cookies || !req.cookies.user) return res.redirect('/login');
        const user = JSON.parse(req.cookies.user);
        
        try {
            const { error, success } = req.query;
            const project = await this.getProjectById.execute(req.params.id);
            const tickets = await this.getAllTicketsByProject.execute(req.params.id);
            res.render('projects/ProjectDetails.ejs', { project, tickets, user, error, success });
        } catch (e: any) {
            res.status(404).send("Projeto não encontrado");
        }
    }

    public createForm(req: Request, res: Response) {
        if (!req.cookies || !req.cookies.user) return res.redirect('/login');
        const user = JSON.parse(req.cookies.user);
        
        if (user.role !== 'GERENTE') return res.status(403).send("Acesso negado");
        
        res.render('projects/CreateProject.ejs', { user, error: null });
    }

    public async create(req: Request, res: Response) {
        if (!req.cookies || !req.cookies.user) return res.redirect('/login');
        const user = JSON.parse(req.cookies.user);
        if (user.role !== 'GERENTE') return res.status(403).send("Acesso negado");

        try {
            const { name, description } = req.body;
            await this.createProjectUseCase.execute({ name, description, managerId: user.id });
            res.redirect('/projects');
        } catch (e: any) {
            res.render('projects/CreateProject.ejs', { user, error: "Erro ao criar projeto: " + e.message });
        }
    }

    public async addMember(req: Request, res: Response) {
        if (!req.cookies || !req.cookies.user) return res.redirect('/login');
        const user = JSON.parse(req.cookies.user);
        if (user.role !== 'GERENTE') return res.status(403).send("Acesso negado");

        const projectId = req.params.id;
        const { email } = req.body;

        try {
            const userTarget = await this.userRepository.findByEmail(email);
            if (!userTarget) throw new Error("Usuário (E-mail) não encontrado no sistema.");

            await this.addMemberToProject.execute({
                projectId,
                requesterId: user.id,
                userId: userTarget.id
            });
            res.redirect(`/projects/${projectId}?success=Membro+adicionado+com+sucesso`);
        } catch (e: any) {
            res.redirect(`/projects/${projectId}?error=${encodeURIComponent(e.message)}`);
        }
    }
}
