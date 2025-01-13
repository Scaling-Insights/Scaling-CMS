/// <reference types="cypress" />

describe('Login Page', () => {
  beforeEach(() => {
      cy.visit('/'); 
  });

  it('should display validation error when only email is filled in', () => {
    cy.fixture('mocks/login.json').then((data) => {
        cy.get('input[name="email"]').type(data.email);
        cy.get('#loginButton').click();

        cy.get('input[name="password"]').parent().should('contain.text', 'Wachtwoord is verplicht.');
    });
  });

  it('should display validation error when only password is filled in', () => {
    cy.fixture('mocks/login.json').then((data) => {
      cy.get('input[name="password"]').type(data.password);
      cy.get('#loginButton').click();

      cy.get('input[name="email"]').parent().should('contain.text', 'Email is verplicht.');
    });
  });

  it('should display validation errors if both fields are empty', () => {
      cy.get('#loginButton').click();

      cy.get('input[name="email"]').parent().should('contain.text', 'Email is verplicht.');
      cy.get('input[name="password"]').parent().should('contain.text', 'Wachtwoord is verplicht.');
  });

  it('should display an alert when the server is down', () => {
    cy.fixture('mocks/login.json').then((data) => {
      cy.intercept('POST', '/auth/login', { forceNetworkError: true }).as('loginRequest');
      cy.get('input[name="email"]').type(data.email);
      cy.get('input[name="password"]').type(data.password);
      
      cy.get('#loginButton').click();

      cy.on('window:alert', (alertText) => {
          expect(alertText).to.contains('Er is een fout opgetreden, probeer het opnieuw');
      });

      cy.wait('@loginRequest');
    });
  });

  it('should log in successfully with valid credentials', () => {
    cy.intercept('POST', '/auth/login', {
      fixture: 'mocks/authLogin.json',
    }).as('loginRequest');
    cy.visit('/');
    cy.fixture('mocks/login.json').then((data) => {
      cy.get('input[name="email"]').type(data.email);
      cy.get('input[name="password"]').type(data.password);
      cy.get('#loginButton').click();

      cy.wait('@loginRequest');

      cy.url().should('include', '/channel');
    });
  });
});
