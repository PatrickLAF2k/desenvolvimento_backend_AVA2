# 📑 Documentação do Projeto: Sistema de Atendimento Inteligente

## 🏥 Sobre o Projeto
Este é um sistema completo para clínicas médicas que visa automatizar o agendamento de consultas e a organização administrativa. O projeto foi desenvolvido com foco em experiência do usuário (UX), segurança de dados via JWT e integrações inteligentes com APIs externas.

---

## 🚀 Funcionalidades Principais
* **Autenticação Segura:** Login e Cadastro com criptografia de senha e proteção de rotas.
* **Agendamento Inteligente:** Sistema que bloqueia horários já ocupados por médicos específicos em tempo real.
* **Integração ViaCEP:** Preenchimento automático de endereço ao informar o CEP no cadastro.
* **Previsão do Tempo:** Integração com OpenWeatherMap para exibir o clima no dia da consulta, ajudando o paciente a se planejar (alerta de chuva/sol).
* **Dashboard do Paciente:** Visualização de consultas concluídas, próximas consultas e opção de cancelamento.
* **Painel Administrativo:** Gerenciamento total dos atendimentos.

---

## 🛠 Tecnologias Utilizadas

### Frontend
* **Vue.js 3:** Composition API e Script Setup
* **Vite:** Build tool ultra-rápido
* **Iconify:** Biblioteca de ícones dinâmicos
* **Axios:** Consumo de APIs (Interna e Externa)
* **V-Calendar:** Componente de calendário e datepicker

### Backend
* **Node.js + Express:** Estrutura da API Restful
* **Sequelize ORM:** Manipulação do banco de dados relacional
* **JWT (JSON Web Token):** Autenticação e autorização
* **Bcrypt:** Criptografia de senhas

---

## ⚙️ Como Executar o Projeto

### 1. Requisitos Prévios
* Node.js instalado
* Banco de Dados configurado (MySQL/PostgreSQL ou SQLite)

### 2. Configuração do Backend
```bash
cd backend
npm install
```
Crie um arquivo `.env` baseado no exemplo:
```env
PORT=3000
JWT_SECRET=sua_chave_secreta
DB_NAME=clinica_db
OPENWEATHER_API_KEY=sua_chave_da_api
```
Inicie o servidor:
```bash
npm run dev
```
---
3. Configuração do Frontend
```bash
cd frontend
npm install
npm run dev
```
Acesse no navegador:  
http://localhost:5173
---
🔌 APIs Integradas
ViaCEP: Utilizada no cadastro de usuários para buscar Rua, Bairro e Cidade automaticamente.
OpenWeatherMap: Utilizada na Dashboard do Paciente para prever o clima conforme a data da consulta selecionada.
---
📁 Estrutura de Pastas (Principais)
```
src/
 ├── models        # Definição das tabelas do banco de dados
 ├── controllers   # Lógica de negócio (Agendamentos, Login)
 ├── middlewares   # Proteção de rotas JWT
 ├── composables   # Hooks reativos do Vue (useDashboard, useAgendamento)
 └── components    # Componentes reutilizáveis (Modais, Cards)
```
---
👨‍💻 Autor
Seu Nome Aqui - Desenvolvimento Fullstack
---
📌 Dicas para a entrega final
Print Screens: Tire prints da Dashboard e da tela de Agendamento e coloque em uma pasta chamada `/screenshots` no GitHub.
Insomnia JSON: Exporte a sua coleção de rotas do Insomnia e coloque na raiz do projeto como `insomnia_collection.json`.
Deploy: Se você for fazer deploy (em serviços como Render, Vercel ou Railway), coloque o link direto no topo do README.