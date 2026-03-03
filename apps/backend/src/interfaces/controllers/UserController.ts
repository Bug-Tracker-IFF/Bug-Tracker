// Controllers são responsáveis por receber as requisições HTTP, processar os dados de entrada, 
// chamar os casos de uso apropriados e retornar as respostas HTTP.
import {Request, Response} from 'express';
import { CreateUser } from '../../application/use_cases/CreateUser';

export class UserController {
    constructor(private createUser: CreateUser) {}

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const inputDTO = req.body;
            const outputDTO = await this.createUser.execute(inputDTO);
            return res.status(201).json(outputDTO);
        } catch (error) {
            if (error instanceof Error && error.message.includes("already exists")) {
                return res.status(409).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}