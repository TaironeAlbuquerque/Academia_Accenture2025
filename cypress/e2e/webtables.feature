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