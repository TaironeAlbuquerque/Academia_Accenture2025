// cypress/support/commands.js

// Comando customizado para preencher formulário de registro
Cypress.Commands.add('fillRegistrationForm', (userData) => {
  cy.get('#firstName').clear().type(userData.firstName);
  cy.get('#lastName').clear().type(userData.lastName);
  cy.get('#userEmail').clear().type(userData.email);
  cy.get('#age').clear().type(userData.age);
  cy.get('#salary').clear().type(userData.salary);
  cy.get('#department').clear().type(userData.department);
});

// Comando customizado para verificar se registro existe na tabela
Cypress.Commands.add('verifyRecordInTable', (userData) => {
  cy.get('.rt-tbody').should('contain', userData.firstName);
  cy.get('.rt-tbody').should('contain', userData.lastName);
  cy.get('.rt-tbody').should('contain', userData.email);
  cy.get('.rt-tbody').should('contain', userData.age);
  cy.get('.rt-tbody').should('contain', userData.salary);
  cy.get('.rt-tbody').should('contain', userData.department);
});

// Comando customizado para encontrar e clicar em botão por título
Cypress.Commands.add('clickButtonByTitle', (title) => {
  cy.get(`[title="${title}"]`).should('be.visible').click();
});

// Comando para aguardar elemento estar visível
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

// Comando para limpar e digitar em campo
Cypress.Commands.add('clearAndType', { prevSubject: 'element' }, (subject, text) => {
  cy.wrap(subject).clear().type(text);
});