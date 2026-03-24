// src/infrastructure/main.ts

import express from 'express';
import { UserControllerFactory } from './factories/UserControllerFactory';
import { ProjectControllerFactory } from './factories/ProjectControllerFactory';
import { TicketControllerFactory } from './factories/TicketControllerFactory';
import { AuthControllerFactory } from './factories/AuthControllerFactory';
import { AulaNodeController } from '../interfaces/controllers/views/aulaNodeController';
import { UserViewControllerFactory } from './factories/UserViewControllerFactory';

const app = express();
const port = 3000;  

// Middleware para entender dados JSON que vêm no corpo da requisição
app.use(express.json());

// Exemplo do professor de SSR (Server-Side Rendering) com EJS
app.use(express.static('public')); // Servir arquivos estáticos da pasta 'public'
app.set('view engine', 'ejs'); // Configurar EJS como motor de templates
app.set('views', './src/interfaces/views'); // Definir a pasta onde estão as views


// Rota de saúde para verificar se o servidor está no ar
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'Bug Tracker Backend is healthy!' });
});

// Instanciando os Controllers através das Factories
const userController = UserControllerFactory.create();
const projectController = ProjectControllerFactory.create();
const ticketController = TicketControllerFactory.create();
const authController = AuthControllerFactory.create();
const aulaNodeController = new AulaNodeController();
const userViewController = UserViewControllerFactory.create();

// ==========================================
// ROTAS DA APLICAÇÃO
// ==========================================

// Usuários
app.post('/api/v1/users', (req, res) => userController.create(req, res));
// Rotas de visualização (SSR)
app.get('/usuarios/:id', (req, res) => userViewController.show(req, res));
app.get('/usuarios', (req, res) => userViewController.list(req, res));

// Projetos
app.post('/api/v1/projects', (req, res) => projectController.create(req, res));

// Chamados (Tickets)
app.post('/api/v1/tickets', (req, res) => ticketController.create(req, res));

// Autenticação
app.post('/api/v1/auth/login', (req, res) => authController.login(req, res));

// Assign Ticket
app.post('/api/v1/tickets/:id/assign', (req, res) => ticketController.assign(req, res));

// Update Ticket Status
app.patch('/api/v1/tickets/:id/status', (req, res) => ticketController.updateStatus(req, res)); // Usamos PATCH porque atualiza só uma parte

// Add Comment
app.post('/api/v1/tickets/:id/comments', (req, res) => ticketController.addComment(req, res));

// Add Attachment
app.post('/api/v1/tickets/:id/attachments', (req, res) => ticketController.addAttachment(req, res));


// Exemplo do professor de SSR (Server-Side Rendering) com EJS
app.get('/aulaNode', (req, res) => aulaNodeController.renderAulaNodeView(req, res));

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});