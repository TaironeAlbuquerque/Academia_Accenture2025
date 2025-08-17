# Desafio Técnico Cypress - Academia Accenture 2025

## Descrição do Projeto

Este projeto foi desenvolvido como parte do desafio técnico da Academia Accenture 2025, implementando automação de testes para a interface web do portal https://demoqa.com/webtables utilizando Cypress com Cucumber e seguindo as melhores práticas de desenvolvimento de testes automatizados.

## Objetivo

Realizar automação da interface da página https://demoqa.com/webtables utilizando Cypress.com com boas práticas de desenvolvimento e testes, implementando:

- Estrutura de automação baseada na Academia Accenture 2025
- Padrão de projeto Page Object Model (POM)
- Escrita das features em formato Gherkin
- Dados sensíveis tratados adequadamente
- Validações obrigatórias contempladas

## Cenários Automatizados

O projeto contempla os seguintes cenários de teste:

1. **Adicionar um novo registro**
   - Acessar o portal https://demoqa.com/webtables
   - Acessar o formulário de cadastro
   - Preencher todos os campos obrigatórios com dados válidos
   - Submeter o formulário
   - Validar que os dados aparecem corretamente na tabela

2. **Editar um registro existente**
   - Editar o cadastro e validar a alteração

3. **Excluir um registro existente**
   - Excluir o cadastro e validar a remoção

## Tecnologias Utilizadas

- **Cypress**: Framework de automação de testes end-to-end
- **Cucumber**: Framework para escrita de testes em linguagem natural (Gherkin)
- **Faker.js**: Biblioteca para geração de dados de teste realistas
- **JavaScript/ES6**: Linguagem de programação
- **Page Object Model**: Padrão de design para organização do código

## Estrutura do Projeto

```
Academia_Accenture2025/
├── cypress/
│   ├── integration/
│   │   ├── webtables.feature
│   │   └── webtables/
│   │       └── webtablesSteps.js
│   ├── page-objects/
│   │   └── webtablesPage.js
│   ├── plugins/
│   │   └── index.js
│   └── support/
│       ├── commands.js
│       └── index.js
├── cypress.config.js
├── package.json
└── README.md
```

## Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd Academia_Accenture2025
```

2. Instale as dependências:
```bash
npm install
```

3. Execute os testes:
```bash
# Modo headless
npm run test

# Modo interativo
npm run test:open
```

## Execução dos Testes

### Modo Headless (CI/CD)
```bash
npx cypress run
```

### Modo Interativo (Desenvolvimento)
```bash
npx cypress open
```

## Configurações

### Cypress Configuration (cypress.config.js)
O arquivo de configuração do Cypress está configurado para:
- Suporte ao preprocessador Cucumber
- Especificação de padrões de arquivos .feature
- Configuração do arquivo de suporte

### Package.json Scripts
```json
{
  "scripts": {
    "test": "cypress run",
    "test:open": "cypress open"
  }
}
```

## Padrões e Boas Práticas Implementadas

### Page Object Model (POM)
- Separação clara entre lógica de teste e elementos da página
- Reutilização de código
- Manutenibilidade aprimorada

### Cucumber/Gherkin
- Testes escritos em linguagem natural
- Facilita a comunicação entre equipes técnicas e não-técnicas
- Estrutura Given-When-Then

### Faker.js para Dados de Teste
- Geração automática de dados realistas
- Evita hardcoding de dados de teste
- Melhora a cobertura de testes com dados variados

## Estrutura de Dados de Teste

Os dados de teste são gerados dinamicamente usando Faker.js:

```javascript
userData = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  age: faker.number.int({ min: 18, max: 99 }).toString(),
  salary: faker.number.int({ min: 1000, max: 100000 }).toString(),
  department: faker.commerce.department(),
};
```

## Validações Implementadas

- Verificação de presença de dados na tabela após inserção
- Validação de atualização de dados após edição
- Confirmação de remoção de dados após exclusão
- Tratamento de elementos dinâmicos da interface

## Relatórios e Screenshots

O Cypress gera automaticamente:
- Screenshots em caso de falhas
- Vídeos da execução dos testes
- Relatórios detalhados no terminal

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Contato

Desenvolvido para o Desafio Técnico da Academia Accenture 2025.

---

**Nota**: Este projeto foi desenvolvido seguindo as especificações do desafio técnico e implementa todas as funcionalidades solicitadas com foco em qualidade, manutenibilidade e boas práticas de automação de testes.

