// src/interfaces/controllers/views/UserViewController.ts
import { Request, Response } from 'express';
import { GetUserById } from '../../../application/use_cases/user/GetUserById';
import { GetAllUsers } from '../../../application/use_cases/user/GetAllUsers';

export class UserViewController {
    private getUserById: GetUserById;
    private getAllUsers: GetAllUsers;

    constructor(getUserById: GetUserById, getAllUsers: GetAllUsers) {
        this.getUserById = getUserById;
        this.getAllUsers = getAllUsers;
    }

    public async show(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            if (typeof id !== 'string') {
                return res.status(400).send('ID inválido');
            }
            const user = await this.getUserById.execute(id);
            if (!user) return res.status(404).send('Usuário não encontrado');
            res.render('User.ejs', { user: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                role: user.getRole()
            }});
        } catch (error) {
            return res.status(500).send('Erro ao buscar usuário');
        }
    }

    public async list(req: Request, res: Response): Promise<any> {
        try {
            const users = await this.getAllUsers.execute();
            res.render('Users.ejs', { users });
        } catch (error) {
            return res.status(500).send('Erro ao buscar usuários');
        }
    }
}
