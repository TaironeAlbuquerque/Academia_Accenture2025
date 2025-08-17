// cypress/fixtures/testData.js

export const validationTestData = {
  // Dados para teste de campos de texto (firstName, lastName, department)
  textFields: {
    validValues: [
      { value: 'João', description: 'Nome simples' },
      { value: 'Maria-Silva', description: 'Nome com hífen' },
      { value: 'José123', description: 'Nome com números' },
      { value: 'Ana_Costa', description: 'Nome com underscore' },
      { value: 'Pedro!@#', description: 'Nome com caracteres especiais' },
      { value: 'Luíza&*()', description: 'Nome com símbolos' },
      { value: 'TI@2024', description: 'Departamento com @ e números' },
      { value: 'Vendas#$%', description: 'Departamento com símbolos especiais' },
      { value: 'A', description: 'Valor com 1 caractere' },
      { value: 'Nome muito longo para testar limite de caracteres', description: 'Nome muito longo' }
    ]
  },

  // Dados para teste de campo idade
  ageField: {
    validValues: [
      { value: '0', description: 'Idade mínima (0)' },
      { value: '1', description: 'Idade com 1 dígito' },
      { value: '18', description: 'Idade padrão (18)' },
      { value: '25', description: 'Idade comum (25)' },
      { value: '99', description: 'Idade máxima válida (99)' },
      { value: '65', description: 'Idade de aposentadoria' }
    ],
    invalidValues: [
      { value: 'abc', description: 'Letras no campo idade', expectedBehavior: 'filter' },
      { value: '12.5', description: 'Número decimal', expectedBehavior: 'filter' },
      { value: '-5', description: 'Número negativo', expectedBehavior: 'filter' },
      { value: '100', description: 'Idade com 3 dígitos (>99)', expectedBehavior: 'limit' },
      { value: '999', description: 'Idade muito alta', expectedBehavior: 'limit' },
      { value: '1a5', description: 'Mistura de número e letra', expectedBehavior: 'filter' },
      { value: '!@#', description: 'Caracteres especiais', expectedBehavior: 'filter' },
      { value: ' ', description: 'Espaço em branco', expectedBehavior: 'filter' }
    ]
  },

  // Dados para teste de campo salário
  salaryField: {
    validValues: [
      { value: '0', description: 'Salário zero' },
      { value: '1000', description: 'Salário baixo' },
      { value: '5000', description: 'Salário médio' },
      { value: '50000', description: 'Salário alto' },
      { value: '1000000', description: 'Salário muito alto (7 dígitos)' },
      { value: '9999999999', description: 'Salário máximo (10 dígitos)' }
    ],
    invalidValues: [
      { value: 'abc', description: 'Letras no campo salário', expectedBehavior: 'filter' },
      { value: '12.50', description: 'Número decimal', expectedBehavior: 'filter' },
      { value: '-1000', description: 'Salário negativo', expectedBehavior: 'filter' },
      { value: '10000000000', description: 'Salário com 11 dígitos', expectedBehavior: 'limit' },
      { value: '99999999999', description: 'Salário muito alto', expectedBehavior: 'limit' },
      { value: '5000a', description: 'Mistura de número e letra', expectedBehavior: 'filter' },
      { value: '$5000', description: 'Salário com símbolo', expectedBehavior: 'filter' },
      { value: '5,000', description: 'Salário com vírgula', expectedBehavior: 'filter' }
    ]
  },

  // Dados para teste de campo email
  emailField: {
    validValues: [
      { email: 'test@ab.co', description: 'Email com domínio mínimo (2 chars)' },
      { email: 'user@domain.com', description: 'Email padrão' },
      { email: 'user.name@test.org', description: 'Email com ponto no nome' },
      { email: 'user+tag@example.net', description: 'Email com tag' },
      { email: '123@test.io', description: 'Email com números no nome' },
      { email: 'test_user@company.co.uk', description: 'Email com underscore e domínio composto' },
      { email: 'a@b.co', description: 'Email mínimo válido' },
      { email: 'very.long.email.name@very.long.domain.name.com', description: 'Email muito longo' }
    ],
    invalidValues: [
      { email: 'test@a.c', description: 'Domínio com menos de 2 chars' },
      { email: 'test@', description: 'Email sem domínio' },
      { email: '@domain.com', description: 'Email sem nome de usuário' },
      { email: 'test.domain.com', description: 'Email sem @' },
      { email: 'test@.com', description: 'Email com domínio inválido' },
      { email: 'test@domain', description: 'Email sem extensão' },
      { email: 'test@@domain.com', description: 'Email com @ duplo' },
      { email: 'test @domain.com', description: 'Email com espaço' },
      { email: '', description: 'Email vazio' },
      { email: 'test@domain.', description: 'Email com ponto final' }
    ]
  },

  // Combinações para teste de campos obrigatórios
  requiredFieldsCombinations: [
    {
      description: 'Todos os campos vazios',
      fields: {},
      expectedErrors: ['firstName', 'lastName', 'userEmail', 'age', 'salary', 'department']
    },
    {
      description: 'Apenas firstName preenchido',
      fields: { firstName: 'João' },
      expectedErrors: ['lastName', 'userEmail', 'age', 'salary', 'department']
    },
    {
      description: 'firstName e lastName preenchidos',
      fields: { firstName: 'João', lastName: 'Silva' },
      expectedErrors: ['userEmail', 'age', 'salary', 'department']
    },
    {
      description: 'Todos exceto email',
      fields: { 
        firstName: 'João', 
        lastName: 'Silva', 
        age: '30', 
        salary: '5000', 
        department: 'TI' 
      },
      expectedErrors: ['userEmail']
    }
  ],

  // Dados completos válidos para teste
  validCompleteData: {
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao.silva@test.com',
    age: '30',
    salary: '5000',
    department: 'Tecnologia'
  },

  // Dados com diferentes tipos de erro
  invalidCompleteData: [
    {
      description: 'Email inválido com outros campos válidos',
      data: {
        firstName: 'Maria',
        lastName: 'Santos',
        email: 'maria@a.c',
        age: '25',
        salary: '4000',
        department: 'RH'
      },
      expectedError: 'email'
    },
    {
      description: 'Idade inválida com outros campos válidos',
      data: {
        firstName: 'Pedro',
        lastName: 'Costa',
        email: 'pedro@test.com',
        age: 'abc',
        salary: '3000',
        department: 'Vendas'
      },
      expectedError: 'age'
    },
    {
      description: 'Salário inválido com outros campos válidos',
      data: {
        firstName: 'Ana',
        lastName: 'Oliveira',
        email: 'ana@test.com',
        age: '28',
        salary: 'xyz',
        department: 'Marketing'
      },
      expectedError: 'salary'
    }
  ]
};

export default validationTestData;