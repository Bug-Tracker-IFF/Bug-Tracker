// src/interfaces/controllers/UserController.ts

import {Request, Response} from 'express';
import { CreateUser } from '../../application/use_cases/user/CreateUser';

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