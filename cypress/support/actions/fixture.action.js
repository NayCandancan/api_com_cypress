/// <reference types="cypress" />

Cypress.Commands.add("userFixture", (file) => {
    cy.fixture(file + ".json").as("body")
})

Cypress.Commands.add("usercontract", (file) => {
    cy.fixture(' ' + '/../../contracts/' + file + ".json").as("contract")
})