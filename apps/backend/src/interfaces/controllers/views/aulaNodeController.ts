import {Response, Request} from "express";

export class AulaNodeController {
    public async renderAulaNodeView(req: Request, res: Response): Promise<void> {
        const dadosDisciplina = {
            nome: 'Desenvolvimento de Software',
            professor: 'Dr. João Silva',
            cargaHoraria: 60,
            descricao: 'Disciplina focada em práticas de desenvolvimento de software, incluindo metodologias ágeis, controle de versão e testes.',
            alunos: [
                { nome: 'Maria', matricula: '2021001' },
                { nome: 'Pedro', matricula: '2021002' },
            ]
        };
        res.render('aulaNode.ejs', { disciplina: dadosDisciplina });
    }
}