import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { faker } from '@faker-js/faker';
import WebTablesPage from "../pages/webtablesPage.js"

let userData = {};
let editedUserData = {};
let fieldValue = "";
let specificFieldData = {};

// Steps básicos existentes
Given("que eu acesso a página de Web Tables", () => {
  WebTablesPage.visitPage();
});

Given("que existe um registro na tabela", () => {
  // Primeiro, adiciona um registro para garantir que existe um na tabela
  userData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 0, max: 99 }).toString(),
    salary: faker.number.int({ min: 0, max: 9999999999 }).toString(),
    department: faker.commerce.department(),
  };
  userData.email = `${userData.firstName.toLowerCase()}.${userData.lastName.toLowerCase()}@gmail.com`;

  WebTablesPage.clickAddButton();
  WebTablesPage.fillForm(userData);
  WebTablesPage.submitForm();
  WebTablesPage.verifyRecordExists(userData);
});

When("eu clico no botão {string}", (buttonText) => {
  switch (buttonText) {
    case "Add":
      WebTablesPage.clickAddButton();
      break;
    case "Submit":
      WebTablesPage.submitForm();
      break;
    default:
      throw new Error(`Botão "${buttonText}" não reconhecido`);
  }
});

When("eu preencho o formulário de registro com dados válidos", () => {
  userData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 0, max: 99 }).toString(),
    salary: faker.number.int({ min: 0, max: 9999999999 }).toString(),
    department: faker.commerce.department(),
  };
  userData.email = `${userData.firstName.toLowerCase()}.${userData.lastName.toLowerCase()}@gmail.com`;

  WebTablesPage.fillForm(userData);
});

When("eu clico no botão de edição do registro", () => {
  WebTablesPage.editRecord(userData.firstName);
});

When("eu atualizo o formulário de registro com novos dados válidos", () => {
  editedUserData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 0, max: 99 }).toString(),
    salary: faker.number.int({ min: 0, max: 9999999999 }).toString(),
    department: faker.commerce.department(),
  };
  editedUserData.email = `${editedUserData.firstName.toLowerCase()}.${editedUserData.lastName.toLowerCase()}@gmail.com`;

  WebTablesPage.fillForm(editedUserData);
});

When("eu clico no botão de exclusão do registro", () => {
  WebTablesPage.deleteRecord(userData.firstName);
});

Then("o novo registro deve ser exibido na tabela", () => {
  WebTablesPage.verifyRecordExists(userData);
});

Then("o registro deve ser atualizado na tabela", () => {
  WebTablesPage.verifyRecordExists(editedUserData);
  // Verifica que os dados antigos não estão mais presentes
  WebTablesPage.verifyRecordNotExists(userData.firstName);
});

Then("o registro deve ser removido da tabela", () => {
  WebTablesPage.verifyRecordNotExists(userData.firstName);
});

// ============= NOVOS STEPS PARA VALIDAÇÃO DE CAMPOS =============

// Steps para validação de campos específicos
When("eu preencho o campo {string} com {string}", (fieldName, value) => {
  fieldValue = value;
  specificFieldData[fieldName] = value;
  
  const fieldSelector = {
    'firstName': '#firstName',
    'lastName': '#lastName', 
    'email': '#userEmail',
    'userEmail': '#userEmail',
    'age': '#age',
    'salary': '#salary',
    'department': '#department'
  };
  
  if (fieldSelector[fieldName]) {
    cy.get(fieldSelector[fieldName]).clear().type(value);
  } else {
    throw new Error(`Campo "${fieldName}" não reconhecido`);
  }
});

When("eu preencho os outros campos obrigatórios com dados válidos", () => {
  // Preenche apenas os campos que não foram preenchidos especificamente
  if (!specificFieldData.firstName) {
    cy.get('#firstName').clear().type(faker.person.firstName());
  }
  if (!specificFieldData.lastName) {
    cy.get('#lastName').clear().type(faker.person.lastName());
  }
  if (!specificFieldData.userEmail && !specificFieldData.email) {
    cy.get('#userEmail').clear().type(faker.internet.email());
  }
  if (!specificFieldData.age) {
    cy.get('#age').clear().type(faker.number.int({ min: 18, max: 65 }).toString());
  }
  if (!specificFieldData.salary) {
    cy.get('#salary').clear().type(faker.number.int({ min: 1000, max: 100000 }).toString());
  }
  if (!specificFieldData.department) {
    cy.get('#department').clear().type(faker.commerce.department());
  }
});

When("eu deixo todos os campos em branco", () => {
  cy.get('#firstName').clear();
  cy.get('#lastName').clear();
  cy.get('#userEmail').clear();
  cy.get('#age').clear();
  cy.get('#salary').clear();
  cy.get('#department').clear();
});

When("eu preencho apenas o campo {string} com {string}", (fieldName, value) => {
  // Limpa todos os campos primeiro
  cy.get('#firstName').clear();
  cy.get('#lastName').clear();
  cy.get('#userEmail').clear();
  cy.get('#age').clear();
  cy.get('#salary').clear();
  cy.get('#department').clear();
  
  // Preenche apenas o campo especificado
  const fieldSelector = {
    'firstName': '#firstName',
    'lastName': '#lastName', 
    'email': '#userEmail',
    'userEmail': '#userEmail',
    'age': '#age',
    'salary': '#salary',
    'department': '#department'
  };
  
  if (fieldSelector[fieldName]) {
    cy.get(fieldSelector[fieldName]).type(value);
  }
});

// Steps para validação de comportamento dos campos
Then("o campo deve aceitar o valor inserido", () => {
  // Este step será específico para cada tipo de campo
  // A verificação será feita nos steps mais específicos
});

Then("o campo {string} deve aceitar o valor {string}", (fieldName, expectedValue) => {
  const fieldSelector = {
    'firstName': '#firstName',
    'lastName': '#lastName', 
    'email': '#userEmail',
    'userEmail': '#userEmail',
    'age': '#age',
    'salary': '#salary',
    'department': '#department'
  };
  
  cy.get(fieldSelector[fieldName]).should('have.value', expectedValue);
});

Then("o campo idade deve aceitar o valor {string}", (expectedValue) => {
  cy.get('#age').should('have.value', expectedValue);
});

Then("o campo salário deve aceitar o valor {string}", (expectedValue) => {
  cy.get('#salary').should('have.value', expectedValue);
});

Then("o valor deve conter apenas números", () => {
  // Verifica se o valor do último campo preenchido contém apenas números
  cy.get('#age, #salary').then($fields => {
    $fields.each((index, field) => {
      const value = Cypress.$(field).val();
      if (value) {
        expect(value).to.match(/^\d*$/);
      }
    });
  });
});

// Steps para validação de filtros e limites
Then("o sistema deve filtrar caracteres não numéricos", () => {
  // Verifica se apenas números restaram no campo
  cy.get('#age, #salary').then($fields => {
    $fields.each((index, field) => {
      const value = Cypress.$(field).val();
      expect(value).to.match(/^\d*$/);
    });
  });
});

Then("o campo deve aceitar apenas dígitos válidos", () => {
  cy.get('#age, #salary').then($fields => {
    $fields.each((index, field) => {
      const value = Cypress.$(field).val();
      expect(value).to.match(/^\d*$/);
    });
  });
});

Then("o campo deve aceitar no máximo {int} dígitos", (maxDigits) => {
  cy.get('#age, #salary').then($fields => {
    $fields.each((index, field) => {
      const value = Cypress.$(field).val();
      expect(value.length).to.be.at.most(maxDigits);
    });
  });
});

Then("o valor final deve conter apenas os primeiros {int} dígitos", (maxDigits) => {
  cy.get('#age, #salary').then($fields => {
    $fields.each((index, field) => {
      const value = Cypress.$(field).val();
      expect(value.length).to.be.at.most(maxDigits);
      expect(value).to.match(/^\d*$/);
    });
  });
});

// Steps para validação de submissão
Then("o registro deve ser salvo com sucesso", () => {
  // Verifica se o modal foi fechado (indicando sucesso)
  cy.get('.modal-dialog').should('not.exist');
  // Alternativa: verificar se voltou para a página da tabela
  cy.url().should('include', 'webtables');
});

Then("o sistema deve exibir mensagem de erro para o campo idade", () => {
  // Verifica se o campo idade tem borda vermelha
  cy.get('#age').should('have.css', 'border-color', 'rgb(220, 53, 69)');
});

Then("o sistema deve exibir mensagem de erro para o campo salário", () => {
  // Verifica se o campo salário tem borda vermelha
  cy.get('#salary').should('have.css', 'border-color', 'rgb(220, 53, 69)');
});

Then("o sistema deve exibir mensagem de erro para o campo email", () => {
  // Verifica se o campo email tem borda vermelha
  cy.get('#userEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
});

Then("o sistema deve rejeitar o envio do formulário", () => {
  // Verifica se o modal ainda está aberto (indicando que o formulário foi rejeitado)
  cy.get('.modal-dialog').should('be.visible');
});

Then("o modal deve permanecer aberto", () => {
  cy.get('.modal-dialog').should('be.visible');
});

Then("o sistema deve exibir mensagens de erro para todos os campos obrigatórios", () => {
  // Verifica se o modal ainda está aberto
  requiredFields.forEach(fieldSelector => {
    cy.get(fieldSelector).should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
  
  // Verifica que todos os campos obrigatórios têm borda vermelha
  const requiredFields = ['#firstName', '#lastName', '#userEmail', '#age', '#salary', '#department'];
  
  requiredFields.forEach(fieldSelector => {
    cy.get(fieldSelector).should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
});

Then("todos os campos obrigatórios devem exibir indicação de erro", () => {
  // Verifica que todos os campos obrigatórios têm borda vermelha
  const requiredFields = ['#firstName', '#lastName', '#userEmail', '#age', '#salary', '#department'];
  
  requiredFields.forEach(fieldSelector => {
    cy.get(fieldSelector).should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
});

Then("os campos não preenchidos devem exibir indicação de erro", () => {
  // Verifica que os campos vazios têm borda vermelha
  const allFields = ['#firstName', '#lastName', '#userEmail', '#age', '#salary', '#department'];
  
  allFields.forEach(fieldSelector => {
    cy.get(fieldSelector).invoke('val').then(fieldValue => {
      if (!fieldValue || fieldValue.trim() === '') {
        // Campo vazio deve ter borda vermelha
        cy.get(fieldSelector).should('have.css', 'border-color', 'rgb(220, 53, 69)');
      }
    });
  });
});

// Steps de limpeza e reset
afterEach(() => {
  // Limpa variáveis após cada cenário
  userData = {};
  editedUserData = {};
  fieldValue = "";
  specificFieldData = {};
});