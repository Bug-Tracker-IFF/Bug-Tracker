## 📘 Visão Geral

O Bug Tracker é um sistema corporativo utilizado para registrar, acompanhar e gerenciar bugs e tarefas internas (chamados) dentro de equipes de desenvolvimento de software.

A aplicação oferece organização, rastreabilidade e controle sobre cada etapa da vida útil de um bug, garantindo comunicação clara entre Gerentes de Projeto, Desenvolvedores e QAs (Testers).

## 👥 Perfis de Usuário

| Perfil                            | Função Principal                                                                          |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| 🧑‍💼 **Gerente de Projeto (Admin)** | Cria projetos, adiciona membros e atribui chamados a desenvolvedores.                     |
| 👨‍💻 **Desenvolvedor (Membro)**     | Visualiza e atualiza chamados atribuídos, podendo alterar status e adicionar comentários. |
| 🧪 **QA / Testador (Reportador)** | Cria novos chamados (bugs), adiciona anexos e acompanha o progresso da correção.          |

## 🧩 Lógica de Negócio (Resumo)

- O Gerente cria um Projeto e adiciona Usuários a ele. (ManyToMany)
- Qualquer membro do projeto pode criar um Chamado (Bug).
- O Gerente pode atribuir o chamado a um Desenvolvedor específico.
- Cada Chamado passa por uma sequência de estados controlados por uma Máquina de Estado:
  ABERTO → EM_ANDAMENTO → PARA_TESTAR → FECHADO
- Comentários e anexos (logs e imagens) podem ser adicionados em cada chamado.
- Apenas os membros de um projeto podem visualizar e manipular seus chamados.

## ⚙️ Requisitos Funcionais (RFs)

| Código    | Descrição                                                                                 |
| --------- | ----------------------------------------------------------------------------------------- |
| **RF-01** | O Gerente cria Projetos e adiciona Membros (relação ManyToMany).                          |
| **RF-02** | Qualquer Membro pode criar um Chamado (Bug) e anexar arquivos (logs, screenshots).        |
| **RF-03** | O Gerente pode atribuir o Chamado a um Desenvolvedor.                                     |
| **RF-04** | O Chamado deve transitar por status: `ABERTO` → `EM_ANDAMENTO` → `RESOLVIDO` → `FECHADO`. |

## 🧠 Requisitos Não Funcionais (RNFs)

| Código     | Descrição                                                                                             |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| **RNF-01** | A transição de status dos Chamados deve ser controlada por uma **Máquina de Estados**. _(Desafio C3)_ |
| **RNF-02** | O sistema deve permitir **upload de arquivos** (.txt e imagens). _(Desafio C6)_                       |
