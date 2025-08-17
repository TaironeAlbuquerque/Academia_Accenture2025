import "./commands";

// cypress/support/e2e.js

import './commands';

// Configurações globais
Cypress.on('uncaught:exception', (err, runnable) => {
  // Previne que o Cypress falhe em exceções não capturadas
  return false;
});

// Comandos antes de cada teste
beforeEach(() => {
  // Configurações que devem executar antes de cada teste
  cy.viewport(1280, 720);
});