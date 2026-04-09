// src/interfaces/controllers/views/UserViewController.ts
import { Request, Response } from 'express';
import { GetAllUsers } from '../../../application/use_cases/user/GetAllUsers';
import { CreateUser } from '../../../application/use_cases/user/CreateUser';
import { UpdateUser } from '../../../application/use_cases/user/UpdateUser';
import { DeleteUser } from '../../../application/use_cases/user/DeleteUser';
import { GetUserById } from '../../../application/use_cases/user/GetUserById';

export class UserViewController {
    constructor(
        private getAllUsers: GetAllUsers,
        private getUserById: GetUserById,
        private createUserUseCase: CreateUser,
        private updateUserUseCase: UpdateUser,
        private deleteUserUseCase: DeleteUser
    ) {}

    private isGerente(req: Request): any | null {
        if (!req.cookies || !req.cookies.user) return null;
        const user = JSON.parse(req.cookies.user);
        if (user.role !== 'GERENTE') return null;
        return user;
    }

    public async list(req: Request, res: Response) {
        const user = this.isGerente(req);
        if (!user) return res.status(403).send("Acesso negado");

        try {
            const users = await this.getAllUsers.execute();
            res.render('users/Index.ejs', { users, user, error: null, success: req.query.success });
        } catch (e: any) {
            res.status(500).send("Erro ao carregar membros");
        }
    }

    public createForm(req: Request, res: Response) {
        const user = this.isGerente(req);
        if (!user) return res.status(403).send("Acesso negado");

        res.render('users/Form.ejs', { member: null, user, error: null });
    }

    public async create(req: Request, res: Response) {
        const user = this.isGerente(req);
        if (!user) return res.status(403).send("Acesso negado");

        try {
            const { name, email, password, role } = req.body;
            await this.createUserUseCase.execute({ name, email, password, role });
            res.redirect('/members?success=Membro+criado+com+sucesso');
        } catch (e: any) {
            res.render('users/Form.ejs', { member: null, user, error: "Erro ao criar membro: " + e.message });
        }
    }

    public async editForm(req: Request, res: Response) {
        const user = this.isGerente(req);
        if (!user) return res.status(403).send("Acesso negado");

        try {
            const member = await this.getUserById.execute(req.params.id);
            if (!member) return res.status(404).send("Membro não encontrado");
            res.render('users/Form.ejs', { member, user, error: null });
        } catch (e: any) {
            res.status(500).send("Erro ao carregar membro");
        }
    }

    public async update(req: Request, res: Response) {
        const user = this.isGerente(req);
        if (!user) return res.status(403).send("Acesso negado");

        const memberId = req.params.id;
        try {
            const { name, email, role } = req.body;
            await this.updateUserUseCase.execute({ id: memberId, name, email, role });
            res.redirect('/members?success=Membro+atualizado+com+sucesso');
        } catch (e: any) {
            const member = await this.getUserById.execute(memberId).catch(() => null);
            res.render('users/Form.ejs', { member, user, error: "Erro ao atualizar membro: " + e.message });
        }
    }

    public async delete(req: Request, res: Response) {
        const user = this.isGerente(req);
        if (!user) return res.status(403).send("Acesso negado");

        try {
            await this.deleteUserUseCase.execute(req.params.id);
            res.redirect('/members?success=Membro+removido+com+sucesso');
        } catch (e: any) {
            res.redirect('/members?error=Erro+ao+remover+membro');
        }
    }
}
