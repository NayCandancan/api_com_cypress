/// <reference types="Cypress" />

export class UserServer
{
    constructor ()
    {
        this.url = 'http://agapito-server.herokuapp.com';
    }

    getURLUsers = () => this.url + '/users';
 }
