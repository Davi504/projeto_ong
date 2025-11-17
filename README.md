# Projeto ONG

## 📖 Descrição do Projeto ONG
O projeto é uma aplicação web em formato Single Page Application (SPA) que representa uma ONG fictícia.
Ele tem como objetivo:
- Mostrar os projetos sociais em andamento.
- Permitir o cadastro de voluntários.
- Divulgar formas de doação.
- Garantir acessibilidade e responsividade.

## 📂 Estrutura
- index.html → página inicial com apresentação da ONG.
- html/projetos.html → lista dos projetos sociais.
- html/cadastro.html → formulário para voluntários.
- css/style.css → estilos e responsividade.
- js/spa.js → roteador SPA simples com hash.
- js/templates.js → funções para renderizar projetos.
- js/form-validation.js → validação do formulário.
- img/ → imagens da ONG e dos projetos.

## ✨ Funcionalidades
- Navegação SPA com hash (#/index, #/projetos, #/cadastro).
- Projetos sociais exibidos em cards.
- Formulário de cadastro de voluntários com validação.
- Layout responsivo.
- Acessibilidade (uso de alt, aria-label, contraste adequado).
- Possibilidade de rodar localmente com Live Server.

## ⚙️ Como rodar
- Abra o projeto no VS Code.
- Instale a extensão Live Server.
- Clique com o botão direito em index.html → Open with Live Server.
- O navegador abre em http://127.0.0.1:5500/index.html.

## 📌 Versionamento
- GitFlow aplicado (main, develop, feature, release).
- Commits semânticos (feat:, fix:, docs:).
- Releases criadas (v1.0.0, v1.1.0, v1.2.0, v1.3.0).

## 📜 Changelog

- v1.0.0 – Entrega I
- Estrutura inicial em **HTML**
- Criação das páginas principais (`index.html`, `projetos.html`, `cadastro.html`)
- Organização semântica básica (header, nav, main, section, footer)
---
- v1.1.0 – Entrega II
- Implementação de **CSS**
- Estilização responsiva do layout
- Definição da paleta de cores e tipografia
- Ajustes de contraste para acessibilidade
---
- v1.2.0 – Entrega III
- Implementação de **JavaScript**
- Criação do roteador SPA (`spa.js`)
- Validação de formulário (`form-validation.js`)
- Funções para renderização de projetos (`templates.js`)
- Navegação dinâmica entre páginas
---
- v1.3.0 – Entrega IV
- Ajustes finais de acessibilidade (WCAG 2.1 AA)
- Inclusão de `aria-label` e `alt` em imagens
- Navegação por teclado testada e validada
- Otimização de CSS/JS (minificação) e compressão de imagens
- Documentação técnica completa (`README.md`)
- Versionamento GitFlow aplicado com commits semânticos


