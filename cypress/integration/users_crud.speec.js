/// <reference types="cypress" />

import { UserRest } from "../support/request/UserRest"
import { UserServer } from "../support/services/Userservers"
    

describe('@users - Users CRUD', () => 
{
        
        const userRest = new UserRest();
        const userServer = new UserServer();
    

    context('Funcionalidade', () =>
    {
    
        it('Testando o GET retornando todos os usuários', () => 
        {
            userRest.executeGet(userServer.getURLUsers()).should(({status, body}) => 
            {            
                userRest.logResponse(status, body)
                expect(status).to.eq(200)
            })

        })
        it('Criando usuário via POST', () => 
        {
            cy.userFixture("user")
            cy.get("@body").then((bodyAux) => 
            {
                userRest.executePost(userServer.getURLUsers(), bodyAux).should(({status, body}) => 
                {            
                    userRest.logResponse(status, body)
                    expect(status).to.eq(201)
                })

            })

        })
        it('Criando um usuário com POST e em seguida validando sua criação pelo GET', () => 
        {
            cy.createPatternUser("Nayara","Nayara Candançan Leite","teste@teste.com", "20")
            cy.get("@body").then((bodyIDUser) =>
            {
                userRest.executeGet(userServer.getURLUsers() + '/' + bodyIDUser.id).should(({status, body}) => 
                {            
                    userRest.logResponse(status, body)
                    expect(status).to.eq(200)
                   
                    expect(body.id).eq(bodyIDUser.id)
                    expect(body.login).eq("Nayara")
                    expect(body.full_name).eq("Nayara Candançan Leite")
                    expect(body.email).eq("teste@teste.com")
                    expect(body.age).eq(20)
                    expect(body.created_at).to.be.exist
                    expect(body.updated_at).to.be.exist

                })

             })
        })
        it('Update de um usuário utilizando Put', () => 
        {
            cy.createPatternUser("Nana","Nayara Candançan","nay.nay@teste.com", "18")
            cy.get("@body").then((bodyUser) =>
            {
                bodyUser.login = "Naynay"
                bodyUser.full_name = "Nay Candançan"
                bodyUser.email = "putdanay@teste.com"
                bodyUser.age = 20
                userRest.executePut(userServer.getURLUsers() + '/' + bodyUser.id, bodyUser).should(({status, body}) => 
                {            
                    userRest.logResponse(status, body)
                    expect(status).to.eq(200)

                    userRest.executeGet(userServer.getURLUsers() + '/' + bodyUser.id).should(({body}) => 
                    {
                    
                        expect(body.id).eq(bodyUser.id)
                        expect(body.login).eq("Naynay")
                        expect(body.full_name).eq("Nay Candançan")
                        expect(body.email).eq("putdanay@teste.com")
                        expect(body.age).eq(20)
                        expect(body.created_at).to.be.exist
                        expect(body.updated_at).to.be.exist
                    })

                })
            })
        })

        it('Update de um usuário utilizando Patch', () => 
        {
            cy.createPatternUser("Nana","Nayara Candançan","nay.nay@teste.com", "18")
            cy.get("@body").then((bodyUser) =>
            {
            
                bodyUser.age = 20
                userRest.executePatch(userServer.getURLUsers() + '/' + bodyUser.id, bodyUser).should(({status, body}) => 
                {            
                    userRest.logResponse(status, body)
                    expect(status).to.eq(200)

                    userRest.executeGet(userServer.getURLUsers() + '/' + bodyUser.id).should(({body}) => 
                    {
                    
                        expect(body.id).eq(bodyUser.id)
                        expect(body.login).eq("Nana")
                        expect(body.full_name).eq("Nayara Candançan")
                        expect(body.email).eq("nay.nay@teste.com")
                        expect(body.age).eq(20)
                        expect(body.created_at).to.be.exist
                        expect(body.updated_at).to.be.exist
                    })

                })
            })
        })
        it('Deletando um usuário', () => 
        {
            cy.createPatternUser("Nana","Nayara Candançan","nananabatman@teste.com", "18")
            cy.get("@body").then((bodyUser) =>
            {
            
                bodyUser.age = 20
                userRest.executeDelete(userServer.getURLUsers() + '/' + bodyUser.id, bodyUser).should(({status, body}) => 
                {     
                    userRest.logResponse(status, body)
                    expect(status).to.eq(204)

                    userRest.executeGet(userServer.getURLUsers() + '/' + bodyUser.id).should(({status}) => 
                    {
                        expect(status).to.eq(404)
                    })
                })
            })
        })
        
    })
    
    context('Arquitetura', () =>
    {
        it('@contract - Validando o contrato da aplicação',() => 
        {
            cy.createPatternUser("Nana","Nayara Candançan","nay.nay@teste.com", "18")
            cy.get("@body").then((bodyUser) =>
            {
            
                bodyUser.age = 20
                userRest.executePatch(userServer.getURLUsers() + '/' + bodyUser.id, bodyUser).should(({status, body}) => 
                {            
                    userRest.logResponse(status, body)
                    expect(status).to.eq(200)
                    cy.validateContract ('userContract', body)
                })
            })
        })    
    })

})
        



       


