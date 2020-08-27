import { Antes, Então, Quando } from '../../../support/commands';

context('IndexPage', () => {
  Antes({tags: '@indexPage'},() => {
    cy.server();
    
    cy.route({
      method: 'GET',
      status: 200,
      url: '/api/v1/mensagens',
      response: 'fixture:200_INDEX_API_V1_MESSAGES.json'
    }).as('getMessagesSuccess');

    cy.route({
      method: 'POST',
      status: 201,
      url: '/api/v1/mensagens',
      response: 'fixture:201_CREATE_API_V1_MESSAGES.json'
    }).as('postMessagesSuccess');
  });

  Então('o usuário deve visualizar um formulário de nome', () => {
    cy.get('.MuiFormLabel-root');
  })

  Quando('o usuário insere seu nome', () => {
    cy.get('input[name=name]').type('Test Enter Chat');
  })
});