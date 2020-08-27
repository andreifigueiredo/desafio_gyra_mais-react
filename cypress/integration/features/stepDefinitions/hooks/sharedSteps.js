import { Então, Dado } from '../../../../support/commands';

Então('cypress deve aguardar o {string}', (alias) => {
  cy.wait(alias)
});

Então('clica no {string}', (objIdentifier) => {
  cy.get(objIdentifier).click();
});

Dado('que o usuário está na url {string}', (url) => {
  cy.visit(url);
});

Então('o usuário deve visualizar a url {string}', (url) => {
  cy.url().should('include', url);
});

Então('o usuário deve visualizar um header padrão', () => {
  cy.get('.MuiToolbar-root > div');
})