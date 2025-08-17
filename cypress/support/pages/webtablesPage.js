class WebTablesPage {
  // Elementos da página
  get addButton() {
    return cy.get('#addNewRecordButton');
  }

  get searchBox() {
    return cy.get('#searchBox');
  }

  get firstNameInput() {
    return cy.get('#firstName');
  }

  get lastNameInput() {
    return cy.get('#lastName');
  }

  get emailInput() {
    return cy.get('#userEmail');
  }

  get ageInput() {
    return cy.get('#age');
  }

  get salaryInput() {
    return cy.get('#salary');
  }

  get departmentInput() {
    return cy.get('#department');
  }

  get submitButton() {
    return cy.get('#submit');
  }

  get closeButton() {
    return cy.get('#closeLargeModal');
  }

  get registrationForm() {
    return cy.get('.modal-content');
  }

  get tableRows() {
    return cy.get('.rt-tr-group');
  }

  get tableBody() {
    return cy.get('.rt-tbody');
  }

  // Métodos de interação
  visitPage() {
    cy.visit('/webtables');
    cy.wait(5000); // Aguarda carregamento da página
  }

  clickAddButton() {
    this.addButton.should('be.visible').click();
    cy.wait(5000); // Aguarda modal aparecer
  }

  fillForm(userData) {
    this.registrationForm.should('be.visible');
    
    this.firstNameInput.clear().type(userData.firstName);
    this.lastNameInput.clear().type(userData.lastName);
    this.emailInput.clear().type(userData.email);
    this.ageInput.clear().type(userData.age);
    this.salaryInput.clear().type(userData.salary);
    this.departmentInput.clear().type(userData.department);
  }

  submitForm() {
    this.submitButton.click();
    cy.wait(5000); // Aguarda processamento
  }

  searchTable(searchText) {
    this.searchBox.clear().type(searchText);
    cy.wait(5000);
  }

  editRecord(firstName) {
    this.tableBody
      .contains(firstName)
      .parent('.rt-tr')
      .find('[title="Edit"]')
      .should('be.visible')
      .click();
    cy.wait(5000);
  }

  deleteRecord(firstName) {
    this.tableBody
      .contains(firstName)
      .parent('.rt-tr')
      .find('[title="Delete"]')
      .should('be.visible')
      .click();
    cy.wait(5000);
  }

  verifyRecordExists(userData) {
    this.tableBody.should('contain', userData.firstName);
    this.tableBody.should('contain', userData.lastName);
    this.tableBody.should('contain', userData.email);
    this.tableBody.should('contain', userData.age);
    this.tableBody.should('contain', userData.salary);
    this.tableBody.should('contain', userData.department);
  }

  verifyRecordNotExists(firstName) {
    this.tableBody.should('not.contain', firstName);
  }

  clearSearch() {
    this.searchBox.clear();
  }
}

export default new WebTablesPage();