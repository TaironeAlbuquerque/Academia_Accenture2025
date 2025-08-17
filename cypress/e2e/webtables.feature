# language: pt
Funcionalidade: Gerenciamento de Registros na Tabela Web
  Como um usuário do sistema
  Quero ser capaz de adicionar, editar e excluir registros na tabela web
  Para gerenciar os dados de forma eficiente
  
  Cenário: Adicionar um novo registro
    Dado que eu acesso a página de Web Tables
    Quando eu clico no botão "Add"
    E eu preencho o formulário de registro com dados válidos
    E eu clico no botão "Submit"
    Então o novo registro deve ser exibido na tabela

  Cenário: Editar um registro existente
    Dado que eu acesso a página de Web Tables
    E que existe um registro na tabela
    Quando eu clico no botão de edição do registro
    E eu atualizo o formulário de registro com novos dados válidos
    E eu clico no botão "Submit"
    Então o registro deve ser atualizado na tabela

  Cenário: Excluir um registro existente
    Dado que eu acesso a página de Web Tables
    E que existe um registro na tabela
    Quando eu clico no botão de exclusão do registro
    Então o registro deve ser removido da tabela

   #Cenários de Validação de Campos

  Esquema do Cenário: Validar campos de texto que aceitam qualquer caractere
    Dado que eu acesso a página de Web Tables
    Quando eu clico no botão "Add"
    E eu preencho o campo "<campo>" com "<valor>"
    E eu preencho os outros campos obrigatórios com dados válidos
    E eu clico no botão "Submit"
    Então o registro deve ser salvo com sucesso

    Exemplos:
      | campo      | valor                    |
      | firstName  | João123!@#              |
      | firstName  | Maria-Silva_2024        |
      | lastName   | Santos#$%               |
      | lastName   | Costa&*()               |
      | department | TI@2024                 |
      | department | Vendas123!              |

  Esquema do Cenário: Validar campo de idade - valores válidos
    Dado que eu acesso a página de Web Tables
    Quando eu clico no botão "Add"
    E eu preencho o campo "age" com "<idade>"
    E eu preencho os outros campos obrigatórios com dados válidos
    E eu clico no botão "Submit"
    Então o registro deve ser salvo com sucesso

    Exemplos:
      | idade |
      | 18    |
      | 25    |
      | 99    |
      | 0     |
      | 10    |

  Esquema do Cenário: Validar campo de idade - valores inválidos
    Dado que eu acesso a página de Web Tables
    Quando eu clico no botão "Add"
    E eu preencho o campo "age" com "<idade_invalida>"
    E eu preencho os outros campos obrigatórios com dados válidos
    E eu clico no botão "Submit"
    Então o sistema deve exibir mensagem de erro para o campo idade

    Exemplos:
      | idade_invalida |
      | abc            |
      | 12.5           |
      | -5             |
      | 100            |
      | 999            |

  Esquema do Cenário: Validar campo de salário - valores válidos
    Dado que eu acesso a página de Web Tables
    Quando eu clico no botão "Add"
    E eu preencho o campo "salary" com "<salario>"
    E eu preencho os outros campos obrigatórios com dados válidos
    E eu clico no botão "Submit"
    Então o registro deve ser salvo com sucesso

    Exemplos:
      | salario    |
      | 1000       |
      | 5000       |
      | 9999999999 |
      | 0          |

  Esquema do Cenário: Validar campo de salário - valores inválidos
    Dado que eu acesso a página de Web Tables
    Quando eu clico no botão "Add"
    E eu preencho o campo "salary" com "<salario_invalido>"
    E eu preencho os outros campos obrigatórios com dados válidos
    E eu clico no botão "Submit"
    Então o sistema deve exibir mensagem de erro para o campo salário

    Exemplos:
      | salario_invalido |
      | abc              |
      | 12.50            |
      | -1000            |
      | 10000000000      |
      | 99999999999      |

  Esquema do Cenário: Validar campo de email - formatos válidos
    Dado que eu acesso a página de Web Tables
    Quando eu clico no botão "Add"
    E eu preencho o campo "email" com "<email_valido>"
    E eu preencho os outros campos obrigatórios com dados válidos
    E eu clico no botão "Submit"
    Então o registro deve ser salvo com sucesso

    Exemplos:
      | email_valido          |
      | teste@ab.co           |
      | user@domain.com       |
      | user.name@test.org    |
      | user+tag@example.net  |
      | 123@test.io           |

  Esquema do Cenário: Validar campo de email - formatos inválidos
    Dado que eu acesso a página de Web Tables
    Quando eu clico no botão "Add"
    E eu preencho o campo "email" com "<email_invalido>"
    E eu preencho os outros campos obrigatórios com dados válidos
    E eu clico no botão "Submit"
    Então o sistema deve exibir mensagem de erro para o campo email

    Exemplos:
      | email_invalido    |
      | teste@a.c         |
      | teste@            |
      | @domain.com       |
      | teste.domain.com  |
      | teste@            |
      | teste@.com        |
      | teste@domain      |

   Cenário: Validar campos obrigatórios em branco
    Dado que eu acesso a página de Web Tables
    Quando eu clico no botão "Add"
    E eu deixo todos os campos em branco
    E eu clico no botão "Submit"
    Então o sistema deve exibir mensagens de erro para todos os campos obrigatórios

   Cenário: Validar preenchimento parcial de campos obrigatórios
    Dado que eu acesso a página de Web Tables
    Quando eu clico no botão "Add"
    E eu preencho apenas o campo "firstName" com "João"
    E eu clico no botão "Submit"
    Então o sistema deve exibir mensagens de erro para os campos não preenchidos