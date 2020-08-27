import { Antes, Então, Quando } from "../../../support/commands";

context("ChatPage", () => {
  Antes({ tags: "@chatPage" }, () => {
    cy.server();

    localStorage.setItem("name", "Cypress Teste");

    cy.route({
      method: "GET",
      status: 200,
      url: "/api/v1/mensagens",
      response: "fixture:200_INDEX_API_V1_MESSAGES.json",
    }).as("getMessagesSuccess");

    cy.route({
      method: "POST",
      status: 201,
      url: "/api/v1/mensagens",
      response: "fixture:201_CREATE_API_V1_MESSAGES.json",
    }).as("postMessagesSuccess");
  });

  Antes({ tags: "@failChatPage" }, () => {
    cy.server();

    localStorage.setItem("name", "Cypress Teste");

    cy.route({
      method: "GET",
      status: 200,
      url: "/api/v1/mensagens",
      response: "fixture:200_INDEX_API_V1_MESSAGES.json",
    }).as("getMessagesSuccess");

    cy.route({
      method: "POST",
      status: 422,
      url: "/api/v1/mensagens",
      response: "fixture:422_CREATE_API_V1_MESSAGES.json",
    }).as("postMessagesFail");
  });

  Quando("o usuário preenche o campo de mensagem", () => {
    cy.get("input[name=message]").type("Test Enter Chat");
  });

  Então("deve aparecer um alerta", () => {
    const stub = cy.stub();

    cy.on("window:alert", stub);

    cy.get(".MuiFormLabel-root > .MuiButtonBase-root")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          'Mensagem validation failed: texto: Path `texto` is required.'
        );
      });
  });
});
