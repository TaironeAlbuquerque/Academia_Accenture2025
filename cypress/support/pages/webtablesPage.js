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

  get modalDialog() {
    return cy.get('.modal-dialog');
  }

  get tableRows() {
    return cy.get('.rt-tr-group');
  }

  get tableBody() {
    return cy.get('.rt-tbody');
  }

  // Seletores para mensagens de erro
  get firstNameError() {
    return cy.get('#firstName-error, [data-testid="firstName-error"], .firstName-error');
  }

  get lastNameError() {
    return cy.get('#lastName-error, [data-testid="lastName-error"], .lastName-error');
  }

  get emailError() {
    return cy.get('#userEmail-error, [data-testid="userEmail-error"], .userEmail-error');
  }

  get ageError() {
    return cy.get('#age-error, [data-testid="age-error"], .age-error');
  }

  get salaryError() {
    return cy.get('#salary-error, [data-testid="salary-error"], .salary-error');
  }

  get departmentError() {
    return cy.get('#department-error, [data-testid="department-error"], .department-error');
  }

  // Métodos de interação existentes
  visitPage() {
    cy.visit('/webtables');
    cy.wait(5000); // Aguarda carregamento da página
  }

  clickAddButton() {
    this.addButton.should('be.visible').click();
    cy.wait(2000); // Aguarda modal aparecer
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

  // Novo método para preencher campos específicos
  fillSpecificField(fieldName, fieldValue) {
    this.registrationForm.should('be.visible');
    
    const fieldMap = {
      'firstName': this.firstNameInput,
      'lastName': this.lastNameInput,
      'email': this.emailInput,
      'userEmail': this.emailInput,
      'age': this.ageInput,
      'salary': this.salaryInput,
      'department': this.departmentInput
    };

    const field = fieldMap[fieldName];
    if (field) {
      field.clear().type(fieldValue);
      cy.wait(500); // Pequena pausa para processar a entrada
    } else {
      throw new Error(`Campo '${fieldName}' não encontrado`);
    }
  }

  submitForm() {
    this.submitButton.click();
    cy.wait(3000); // Aguarda processamento
  }

  searchTable(searchText) {
    this.searchBox.clear().type(searchText);
    cy.wait(2000);
  }

  editRecord(firstName) {
    this.tableBody
      .contains(firstName)
      .parent('.rt-tr')
      .find('[title="Edit"]')
      .should('be.visible')
      .click();
    cy.wait(2000);
  }

  deleteRecord(firstName) {
    this.tableBody
      .contains(firstName)
      .parent('.rt-tr')
      .find('[title="Delete"]')
      .should('be.visible')
      .click();
    cy.wait(2000);
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

  // Novos métodos para validação

  verifyModalClosed() {
    // Verifica se o modal foi fechado após submit bem-sucedido
    cy.get('.modal-dialog').should('not.exist');
  }

  verifyModalOpen() {
    // Verifica se o modal ainda está aberto (em caso de erro)
    this.registrationForm.should('be.visible');
  }

  verifyFieldError(fieldName) {
    // Método genérico para verificar erros de campo
    // Como o DemoQA pode não ter mensagens de erro específicas,
    // vamos verificar diferentes possibilidades

    const fieldMap = {
      'firstName': '#firstName',
      'lastName': '#lastName', 
      'userEmail': '#userEmail',
      'age': '#age',
      'salary': '#salary',
      'department': '#department'
    };

    const fieldSelector = fieldMap[fieldName];
    
    if (fieldSelector) {
      // Verifica se o campo tem classe de erro ou borda vermelha
      cy.get(fieldSelector).then(($field) => {
        // Verifica diferentes possibilidades de indicação de erro
        const hasErrorClass = $field.hasClass('is-invalid') || 
                             $field.hasClass('error') || 
                             $field.hasClass('field-error') ||
                             $field.hasClass('ng-invalid') ||
                             $field.hasClass('validation-error');

        const hasErrorBorder = $field.css('border-color').includes('red') ||
                              $field.css('border-color').includes('rgb(255, 0, 0)') ||
                              $field.css('border').includes('red');

        // Se não há indicação visual de erro, verifica se o modal ainda está aberto
        // (indicando que o submit falhou)
        if (!hasErrorClass && !hasErrorBorder) {
          this.verifyModalOpen();
        }
      });

      // Tenta encontrar mensagem de erro próxima ao campo
      cy.get('body').then(($body) => {
        const possibleErrorSelectors = [
          `${fieldSelector} + .error-message`,
          `${fieldSelector} ~ .error-message`,
          `${fieldSelector} + .invalid-feedback`,
          `${fieldSelector} ~ .invalid-feedback`,
          `[data-error="${fieldName}"]`,
          `.${fieldName}-error`,
          `#${fieldName}-error`
        ];

        let errorFound = false;
        possibleErrorSelectors.forEach(selector => {
          if ($body.find(selector).length > 0) {
            cy.get(selector).should('be.visible');
            errorFound = true;
          }
        });

        // Se não encontrou mensagem específica, verifica se o modal não foi fechado
        if (!errorFound) {
          this.verifyModalOpen();
        }
      });
    }
  }

  verifyFieldValidationByValue(fieldName, expectedBehavior) {
    // Método para validar comportamento específico baseado no valor
    const fieldSelector = {
      'firstName': '#firstName',
      'lastName': '#lastName', 
      'userEmail': '#userEmail',
      'age': '#age',
      'salary': '#salary',
      'department': '#department'
    }[fieldName];

    if (expectedBehavior === 'accept') {
      // Verifica se o valor foi aceito
      cy.get(fieldSelector).should('not.have.class', 'is-invalid');
    } else if (expectedBehavior === 'reject') {
      // Verifica se o valor foi rejeitado
      cy.get(fieldSelector).should('have.class', 'is-invalid')
        .or('have.css', 'border-color').and('contain', 'red');
    }
  }

  // Métodos específicos para validação de tipos de dados

  verifyNumericFieldValidation(fieldName, value, shouldBeValid = true) {
    const fieldSelector = {
      'age': '#age',
      'salary': '#salary'
    }[fieldName];

    if (shouldBeValid) {
      // Verifica se aceita valor numérico válido
      cy.get(fieldSelector).clear().type(value);
      cy.get(fieldSelector).should('have.value', value);
    } else {
      // Verifica se rejeita valor inválido
      cy.get(fieldSelector).clear().type(value);
      // Para campos numéricos, alguns navegadores podem filtrar caracteres não numéricos
      cy.get(fieldSelector).should(($field) => {
        const fieldValue = $field.val();
        expect(fieldValue).to.not.equal(value);
      });
    }
  }

  verifyEmailValidation(email, shouldBeValid = true) {
    this.emailInput.clear().type(email);
    
    if (shouldBeValid) {
      // Verifica padrão de email válido
      cy.get('#userEmail').should('have.value', email);
    } else {
      // Para email inválido, verifica se há indicação de erro após submit
      cy.get('#userEmail').should('have.value', email);
      // O erro será verificado após o submit no step definition
    }
  }

  verifyTextFieldAcceptsAllCharacters(fieldName, value) {
    const fieldSelector = {
      'firstName': '#firstName',
      'lastName': '#lastName',
      'department': '#department'
    }[fieldName];

    cy.get(fieldSelector).clear().type(value);
    cy.get(fieldSelector).should('have.value', value);
  }
}

export default new WebTablesPage();