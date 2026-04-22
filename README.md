# 🛍️ EstiloNorte

E-commerce de roupas moderno com foco em experiência do usuário, desenvolvido com React no frontend e Node.js no backend.

## 🚀 Sobre o projeto

O **EstiloNorte** é uma aplicação full stack que simula uma loja virtual completa, incluindo autenticação de usuários, gerenciamento de produtos e carrinho de compras persistente.

O projeto foi desenvolvido com foco em organização de código, boas práticas e responsividade.

---

## 🧰 Tecnologias utilizadas

### Frontend

* React.js
* Vite
* SCSS Modules
* Context API

### Backend

* Node.js
* Express
* JWT (autenticação)
* API REST

---

## ✨ Funcionalidades

* 🔐 Login e autenticação de usuários
* 🛒 Carrinho de compras persistente por usuário
* 📦 Listagem e filtragem de produtos
* ⚙️ Painel administrativo com CRUD completo de produtos
* 📱 Interface responsiva (mobile e desktop)
* 🎨 Animações e feedback visual (toasts, hover, scroll)

---

## 📁 Estrutura do projeto

```bash
frontend/
backend/
```

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Gabriell-Castro/EstiloNorte_Store.git
cd EstiloNorte_Store
```

---

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

Servidor rodando em:

```
http://localhost:3333
```

---

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação disponível em:

```
http://localhost:5173
```

---

## 🔑 Usuários de teste

**Administrador**

* Email: [admin@estilonorte.com]
* Senha: 123456

**Cliente**

* Email: [cliente@estilonorte.com]
* Senha: 123456

---

## 🌐 Variáveis de ambiente

### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:3333/api
```

### Backend (`backend/.env`)

```
PORT=3333
JWT_SECRET=sua_chave_secreta
CLIENT_URL=http://localhost:5173
```

---

## 📌 Observações

* Projeto desenvolvido com foco em prática e portfólio
* Estrutura preparada para integração com banco de dados futuramente
* Fácil adaptação para produção

---

## 👨‍💻 Autor

Gabriel França Castro
Desenvolvedor Full-Stack
