# 🐞 Bug Tracker – Sistema de Rastreamento de Bugs  

![Status](https://img.shields.io/badge/status-Em%20Desenvolvimento-yellow)
![License: MIT](https://img.shields.io/badge/license-MIT-blue)

---

## 📖 Visão Geral  

O **Bug Tracker** é um sistema corporativo para **reportar, atribuir e acompanhar bugs** em projetos de software.  
Ele centraliza a comunicação entre **Gerentes de Projeto**, **Desenvolvedores** e **QAs**, garantindo **rastreabilidade, organização e controle de qualidade** durante o ciclo de vida de cada bug.

---

## 👥 Perfis de Usuário  

| Perfil | Função Principal |
|--------|------------------|
| 🧑‍💼 **Gerente de Projeto (Admin)** | Cria projetos, adiciona membros e atribui chamados a desenvolvedores. |
| 👨‍💻 **Desenvolvedor (Membro)** | Visualiza e atualiza chamados atribuídos, podendo alterar status e adicionar comentários. |
| 🧪 **QA / Testador (Reportador)** | Cria novos chamados (bugs), adiciona anexos e acompanha o progresso da correção. |

---

## ⚙️ Principais Funcionalidades  

✅ Cadastro e autenticação de usuários (Gerente, QA e Desenvolvedor).  
✅ Criação e gerenciamento de projetos (relação ManyToMany com usuários).  
✅ Registro e rastreamento de **Chamados (Bugs)** com status controlados.  
✅ Upload de arquivos (.txt, imagens) como anexos aos chamados.  
✅ Sistema de **comentários** e **histórico de status** em cada bug.  
✅ Controle de acesso: apenas membros de um projeto podem ver e editar seus chamados.

---

## 🧩 Requisitos Funcionais (RF)

| Código | Descrição |
|--------|------------|
| **RF-01** | O Gerente cria Projetos e adiciona Membros (relação ManyToMany). |
| **RF-02** | Qualquer Membro pode criar um Chamado (Bug) e anexar arquivos (logs, screenshots). |
| **RF-03** | O Gerente pode atribuir o Chamado a um Desenvolvedor. |
| **RF-04** | O Chamado deve transitar por status: `ABERTO` → `EM_ANDAMENTO` → `RESOLVIDO` → `FECHADO`. |

---

## 🧠 Requisitos Não Funcionais (RNF)

| Código | Descrição |
|--------|------------|
| **RNF-01** | A transição de status dos Chamados deve ser controlada por uma **Máquina de Estados**. *(Desafio C3)* |
| **RNF-02** | O sistema deve permitir **upload de arquivos** (.txt e imagens). *(Desafio C6)* |

---

## 🏗️ Arquitetura  

O projeto está dividido em duas camadas principais:

### 🔙 Backend (API RESTful)
- Responsável pela autenticação e controle de acesso.  
- CRUD de Projetos, Chamados, Comentários e Anexos.  
- Implementação da **máquina de estados** e do **upload de arquivos**.  
- Framework sugerido: **Flask** ou **Node.js (Express)**.  

### 💻 Frontend (Interface Web)
- Interface visual e responsiva para interação com o sistema.  
- Exibição de projetos, chamados, comentários e anexos.  
- Framework sugerido: **React**.  

---

## 🧾 Estrutura de Dados

A definir

---

## 🚀 Guia de Instalação

A definir

---

## 📄 Licença

Este projeto é de uso acadêmico e está licenciado sob a MIT License.
Sinta-se livre para reutilizar e adaptar para fins educacionais.
