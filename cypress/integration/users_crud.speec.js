/// <reference types="cypress" />
import { UserRest } from "../support/request/UserRest"
import { UuserServer } from "../support/services/userServer"

describe('@users - Users CRUD', () => 
{
        
        const userRest = new UserRest();
        const userServer = new UuserServer();

    context('Funcionalidade', () =>
    {
    
        it('Testando o Get com muitos usuários', () => 
        {
            userRest.executeGet(userServer.getURLUsers()).should(({status, body}) => 
            {            
                userRest.logResponse(status, body)
                expect(status).to.eq(200)
            })

        })
    })

       
})

