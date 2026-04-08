// src/interfaces/controllers/views/AuthViewController.ts
import { Request, Response } from 'express';
import { AuthenticateUser } from '../../../application/use_cases/user/AuthenticateUser';

export class AuthViewController {
    constructor(private authenticateUser: AuthenticateUser) {}

    public showLoginForm(req: Request, res: Response) {
        // Se já estiver logado, redireciona para projetos
        if (req.cookies && req.cookies.user) {
            return res.redirect('/projects');
        }
        res.render('Login.ejs', { error: null });
    }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.authenticateUser.execute({ email, password });
            
            // Define o cookie para lembrar do usuário
            res.cookie('user', JSON.stringify(user), { httpOnly: true });
            
            return res.redirect('/projects');
        } catch (error: any) {
            return res.render('Login.ejs', { error: 'E-mail ou senha inválidos.' });
        }
    }

    public logout(req: Request, res: Response) {
        res.clearCookie('user');
        res.redirect('/login');
    }
}
