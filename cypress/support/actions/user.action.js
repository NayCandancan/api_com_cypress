/// <reference types="cypress" />
import { UserRest } from "../request/UserRest"
import { UserServer } from "../services/Userservers"

        const userRest = new UserRest();
        const userServer = new UserServer();

Cypress.Commands.add("createPatternUser", (login, name, email, age) => {
    cy.userFixture("user")
    cy.get("@body").then((body)  => {
        body.login = login
        body.full_name = name
        body.email = email
        body.age = age
        cy.log(JSON.stringify(body))
        let userRest = new UserRest();
        userRest.executePost(userServer.getURLUsers(), body).should((response) => 
        {  
            userRest.logResponse(response.status, response.body)
            cy.wrap(response.body).as('body')
        })
    })
})