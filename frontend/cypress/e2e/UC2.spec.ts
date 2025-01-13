/// <reference types="cypress" />
import 'cypress-file-upload';

describe('Viewing content', () => {

    it('should not receive content', () => {
        cy.intercept('POST', '/auth/login', {
            fixture: 'mocks/authLogin.json',
        }).as('loginRequest');
        cy.intercept('POST', '/content/get-range', {
            fixture: 'mocks/content-empty.json'
        }).as('contentRequest-empty');
        cy.visit('/');
        cy.fixture('mocks/login.json').then((data) => {
            cy.get('input[name="email"]').type(data.email);
            cy.get('input[name="password"]').type(data.password);
        });
        cy.get('#loginButton').click();

        
        cy.wait('@loginRequest');
      
        cy.wait('@contentRequest-empty');
        cy.get('p.text-2xl.text-center.py-32').should('contain.text', 'Er is nog geen content beschikbaar');
    });

    it('should receive content', () => {
        cy.intercept('POST', '/auth/login', {
            fixture: 'mocks/authLogin.json',
        }).as('loginRequest');
        cy.intercept('POST', '/content/get-range', {
            fixture: 'mocks/content.json',
            statusCode: 201
        }).as('contentRequest');
        cy.visit('/');
        cy.get('input[name="email"]').type("emal");
        cy.get('input[name="password"]').type("passwprd");
        cy.get('#loginButton').click();

        
        cy.wait('@contentRequest');
        cy.get('.mt-8 > .bg-secondary').should('exist');
    });
});