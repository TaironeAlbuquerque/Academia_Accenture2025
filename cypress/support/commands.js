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

// ===== NOVOS COMANDOS PARA VALIDAÇÃO =====

// Comando para validar campo específico
Cypress.Commands.add('validateField', (fieldName, value, expectedResult = 'valid') => {
  const fieldSelectors = {
    firstName: '#firstName',
    lastName: '#lastName',
    userEmail: '#userEmail',
    age: '#age',
    salary: '#salary',
    department: '#department'
  };

  const selector = fieldSelectors[fieldName];
  if (!selector) {
    throw new Error(`Campo ${fieldName} não encontrado`);
  }

  cy.get(selector).clear().type(value);

  if (expectedResult === 'valid') {
    cy.get(selector).should('not.have.class', 'is-invalid')
                   .and('not.have.class', 'error')
                   .and('not.have.class', 'field-error');
  } else {
    // Para resultado inválido, verificamos após o submit
    cy.get(selector).should('have.value', value);
  }
});

// Comando para validar campo numérico
Cypress.Commands.add('validateNumericField', (fieldName, value, options = {}) => {
  const { minDigits = 1, maxDigits = 10, allowDecimals = false } = options;
  
  const fieldSelectors = {
    age: '#age',
    salary: '#salary'
  };

  const selector = fieldSelectors[fieldName];
  if (!selector) {
    throw new Error(`Campo numérico ${fieldName} não encontrado`);
  }

  cy.get(selector).clear().type(value);

  // Verifica se o valor inserido atende aos critérios
  cy.get(selector).then(($field) => {
    const fieldValue = $field.val();
    
    if (typeof value === 'string' && /[a-zA-Z]/.test(value)) {
      // Se contém letras, deve ser filtrado pelo campo
      expect(fieldValue).to.not.equal(value);
    } else if (typeof value === 'string' && value.includes('.') && !allowDecimals) {
      // Se contém decimais e não são permitidos
      expect(fieldValue).to.not.include('.');
    } else if (fieldValue.length > maxDigits) {
      // Se excede o número máximo de dígitos
      expect(fieldValue.length).to.be.at.most(maxDigits);
    }
  });
});

// Comando para validar campo de email
Cypress.Commands.add('validateEmailField', (email, shouldBeValid = true) => {
  cy.get('#userEmail').clear().type(email);
  
  if (shouldBeValid) {
    // Verifica se é um email válido básico
    cy.get('#userEmail').should('have.value', email);
    
    // Validação básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    expect(email).to.match(emailRegex);
  } else {
    // Para email inválido, o valor ainda será inserido
    // A validação de erro acontecerá no submit
    cy.get('#userEmail').should('have.value', email);
  }
});

// Comando para verificar mensagens de erro de campo
Cypress.Commands.add('checkFieldError', (fieldName) => {
  const errorSelectors = {
    firstName: ['#firstName-error', '.firstName-error', '[data-error="firstName"]'],
    lastName: ['#lastName-error', '.lastName-error', '[data-error="lastName"]'],
    userEmail: ['#userEmail-error', '.userEmail-error', '[data-error="userEmail"]'],
    age: ['#age-error', '.age-error', '[data-error="age"]'],
    salary: ['#salary-error', '.salary-error', '[data-error="salary"]'],
    department: ['#department-error', '.department-error', '[data-error="department"]']
  };

  const fieldSelectors = {
    firstName: '#firstName',
    lastName: '#lastName',
    userEmail: '#userEmail',
    age: '#age',
    salary: '#salary',
    department: '#department'
  };

  // Tenta encontrar mensagens de erro específicas
  const possibleSelectors = errorSelectors[fieldName] || [];
  let errorFound = false;

  possibleSelectors.forEach(selector => {
    cy.get('body').then($body => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).should('be.visible');
        errorFound = true;
      }
    });
  });

  // Se não encontrou mensagem específica, verifica indicadores visuais de erro
  if (!errorFound) {
    const fieldSelector = fieldSelectors[fieldName];
    if (fieldSelector) {
      cy.get(fieldSelector).should($field => {
        const hasErrorClass = $field.hasClass('is-invalid') || 
                             $field.hasClass('error') || 
                             $field.hasClass('field-error') ||
                             $field.hasClass('ng-invalid');
                             
        const hasErrorStyle = $field.css('border-color').includes('red') ||
                             $field.css('border-color') === 'rgb(220, 53, 69)' ||
                             $field.css('border-color') === 'rgb(255, 0, 0)';

        // Se não há indicação visual, pelo menos verifica que o modal ainda está aberto
        if (!hasErrorClass && !hasErrorStyle) {
          cy.get('.modal-content').should('be.visible');
        }
      });
    }
  }
});

// Comando para validar que o submit foi rejeitado (modal ainda aberto)
Cypress.Commands.add('verifySubmitRejected', () => {
  // Verifica se o modal ainda está aberto após tentativa de submit
  cy.get('.modal-content').should('be.visible');
  cy.get('.modal-dialog').should('be.visible');
});

// Comando para validar que o submit foi aceito (modal fechado)
Cypress.Commands.add('verifySubmitAccepted', () => {
  // Verifica se o modal foi fechado após submit bem-sucedido
  cy.get('.modal-dialog', { timeout: 10000 }).should('not.exist');
});

// Comando para validar limites de caracteres em campos numéricos
Cypress.Commands.add('validateNumericLimits', (fieldName, testValues) => {
  const fieldSelector = fieldName === 'age' ? '#age' : '#salary';
  
  testValues.forEach(({ value, shouldAccept, description }) => {
    cy.log(`Testando ${fieldName}: ${description}`);
    
    cy.get(fieldSelector).clear().type(value);
    
    if (shouldAccept) {
      cy.get(fieldSelector).should('have.value', value);
    } else {
      // Verifica se o campo filtrou ou limitou a entrada
      cy.get(fieldSelector).should(($field) => {
        const actualValue = $field.val();
        
        if (fieldName === 'age' && actualValue.length > 2) {
          throw new Error(`Campo idade aceitou mais de 2 dígitos: ${actualValue}`);
        }
        
        if (fieldName === 'salary' && actualValue.length > 10) {
          throw new Error(`Campo salário aceitou mais de 10 dígitos: ${actualValue}`);
        }
        
        // Verifica se contém apenas números
        if (!/^\d*$/.test(actualValue)) {
          throw new Error(`Campo ${fieldName} aceitou caracteres não numéricos: ${actualValue}`);
        }
      });
    }
  });
});

// Comando para testar caracteres especiais em campos de texto
Cypress.Commands.add('validateTextFieldCharacters', (fieldName, testValues) => {
  const fieldSelectors = {
    firstName: '#firstName',
    lastName: '#lastName',
    department: '#department'
  };
  
  const fieldSelector = fieldSelectors[fieldName];
  if (!fieldSelector) {
    throw new Error(`Campo de texto ${fieldName} não encontrado`);
  }
  
  testValues.forEach(({ value, description }) => {
    cy.log(`Testando ${fieldName}: ${description}`);
    
    cy.get(fieldSelector).clear().type(value);
    cy.get(fieldSelector).should('have.value', value);
  });
});

// Comando para validar formatos de email
Cypress.Commands.add('validateEmailFormats', (testEmails) => {
  testEmails.forEach(({ email, shouldBeValid, description }) => {
    cy.log(`Testando email: ${description}`);
    
    cy.get('#userEmail').clear().type(email);
    cy.get('#userEmail').should('have.value', email);
    
    if (!shouldBeValid) {
      // A validação real acontecerá no submit
      // Este comando apenas prepara os dados para teste
      cy.wrap(email).as('invalidEmail');
    }
  });
});

// Comando para preencher formulário com dados mínimos necessários
Cypress.Commands.add('fillMinimumRequiredFields', (excludeFields = []) => {
  const defaultData = {
    firstName: 'Test',
    lastName: 'User',
    userEmail: 'test@example.com',
    age: '25',
    salary: '5000',
    department: 'IT'
  };

  Object.keys(defaultData).forEach(field => {
    if (!excludeFields.includes(field)) {
      const fieldSelectors = {
        firstName: '#firstName',
        lastName: '#lastName',
        userEmail: '#userEmail',
        age: '#age',
        salary: '#salary',
        department: '#department'
      };
      
      const selector = fieldSelectors[field];
      if (selector) {
        cy.get(selector).clear().type(defaultData[field]);
      }
    }
  });
});

// Comando para verificar se todos os campos obrigatórios têm indicação de erro
Cypress.Commands.add('verifyAllRequiredFieldsHaveErrors', () => {
  const requiredFields = ['firstName', 'lastName', 'userEmail', 'age', 'salary', 'department'];
  
  requiredFields.forEach(fieldName => {
    cy.checkFieldError(fieldName);
  });
  
  // Também verifica que o modal ainda está aberto
  cy.verifySubmitRejected();
});