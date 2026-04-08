// src/infrastructure/main.ts

import express from 'express';
import { UserControllerFactory } from './factories/UserControllerFactory';
import { ProjectControllerFactory } from './factories/ProjectControllerFactory';
import { TicketControllerFactory } from './factories/TicketControllerFactory';
import { AuthControllerFactory } from './factories/AuthControllerFactory';

import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

// Middleware para entender dados JSON e envio de forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

import { AuthViewControllerFactory } from './factories/AuthViewControllerFactory';
import { ProjectViewControllerFactory } from './factories/ProjectViewControllerFactory';
import { TicketViewControllerFactory } from './factories/TicketViewControllerFactory';

const authViewController = AuthViewControllerFactory.create();
const projectViewController = ProjectViewControllerFactory.create();
const ticketViewController = TicketViewControllerFactory.create();

// ==========================================
// ROTAS DA APLICAÇÃO
// ==========================================

// Rota Base
app.get('/', (req, res) => res.redirect('/login'));

// Autenticação (View UI)
app.get('/login', (req, res) => authViewController.showLoginForm(req, res));
app.post('/login', (req, res) => authViewController.login(req, res));
app.get('/logout', (req, res) => authViewController.logout(req, res));

// View API (SSR)
// Projetos
app.get('/projects', (req, res) => projectViewController.list(req, res));
app.get('/projects/new', (req, res) => projectViewController.createForm(req, res));
app.post('/projects', (req, res) => projectViewController.create(req, res));
app.get('/projects/:id', (req, res) => projectViewController.show(req, res));
app.post('/projects/:id/members', (req, res) => projectViewController.addMember(req, res));

// Chamados (Tickets) Views
app.get('/projects/:projectId/tickets/new', (req, res) => ticketViewController.createForm(req, res));
app.post('/projects/:projectId/tickets/new', (req, res) => ticketViewController.create(req, res));
app.get('/tickets/:id', (req, res) => ticketViewController.show(req, res));
app.post('/tickets/:id/status', (req, res) => ticketViewController.updateStatus(req, res));
app.post('/tickets/:id/assign', (req, res) => ticketViewController.assign(req, res));
app.post('/tickets/:id/comments', (req, res) => ticketViewController.addComment(req, res));
app.post('/tickets/:id/attachments', (req, res) => ticketViewController.addAttachment(req, res));

// ==========================================
// REST API ANTIGA (JSON)
// ==========================================
// Usuários
app.post('/api/v1/users', (req, res) => userController.create(req, res));

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

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});