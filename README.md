# Automação de Testes com Cypress - DemoQA

Este projeto contém uma suíte de testes automatizados para o site [DemoQA](https://demoqa.com/), focando em componentes complexos como **Web Tables**, **Progress Bar** e integração de **API**. O objetivo é demonstrar habilidades em automação E2E, lógica de sincronismo e boas práticas de arquitetura.

## Tecnologias Utilizadas
* [Cypress](https://www.cypress.io/) - Framework de automação.
* [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Linguagem base.
* **Page Object Model (POM)** - Padrão de design para organização e manutenção.
* **Cucumber (Gherkin)** - Para especificações de cenários BDD.

## Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

### 1. Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina (versão 14 ou superior recomendada).

### 2. Clonar o Repositório
```bash
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
cd seu-repositorio
```

### 3. Instalar Dependências
```bash
npm install
```

### 4. Executar os Testes

**Via Cypress Test Runner (Interface Gráfica):**
```bash
npx cypress open
```

**Via Terminal (Modo Headless):**
```bash
npx cypress run
```

---

## Cenários de Teste Implementados

### 1. Elements & Interactions
- **Web Tables:** CRUD completo com persistência de dados, paginação recursiva e bônus de 12 registros dinâmicos via Cucumber.
- **Sortable:** Lógica de `drag and drop` para reordenação de listas em ordem crescente.

### 2. Forms & Alerts
- **Practice Form:** Preenchimento de dados com uso de JSON, upload de arquivos (.txt) integrado ao repositório, validação de popup de confirmação e fechamento de modal.
- **Browser Windows:** Gerenciamento de múltiplas abas/janelas e validação de mensagens em novas instâncias do navegador.

### 3. Widgets (Sincronismo Avançado)
- **Progress Bar:** Automação baseada em estados assíncronos, com interrupção precisa em 25% e reset de componente após atingir 100%.

### 4. API Testing (BookStore)
- **Fluxo de Autenticação:** Criação de usuário, geração de Token e autorização via `Account/v1`.
- **Gerenciamento de Livros:** Listagem de catálogo, aluguel de livros e validação de perfil via `BookStore/v1`.

---

## Estrutura do Projeto
```text
├── cypress/
│   ├── e2e/                     # Execução dos testes
│   │   ├── api/                 # Specs de integração (API)
│   │   ├── features/            # Arquivos .feature (Gherkin)
│   │   └── UI/                  # Specs de interface (E2E)
│   ├── fixtures/                # Massa de dados (JSON, TXT)
│   ├── support/                 # Inteligência do projeto
│   │   ├── api/                 # Services (Camada de requisições)
│   │   ├── pages/               # Page Objects (UI)
│   │   └── step_definitions/    # Implementação dos passos BDD
├── cypress.config.js            # Configurações do ambiente
└── package.json                 # Scripts e dependências
```

---

```

---

