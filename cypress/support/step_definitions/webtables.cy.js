import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { faker } from '@faker-js/faker';
import WebTablesPage from "../pages/webtablesPage.js"

let userData = {};
let editedUserData = {};

Given("que eu acesso a página de Web Tables", () => {
  WebTablesPage.visitPage();
});

And("que existe um registro na tabela", () => {
  // Primeiro, adiciona um registro para garantir que existe um na tabela
  userData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 99 }).toString(),
    salary: faker.number.int({ min: 1000, max: 100000 }).toString(),
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
    age: faker.number.int({ min: 18, max: 99 }).toString(),
    salary: faker.number.int({ min: 1000, max: 100000 }).toString(),
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
    age: faker.number.int({ min: 18, max: 99 }).toString(),
    salary: faker.number.int({ min: 1000, max: 100000 }).toString(),
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