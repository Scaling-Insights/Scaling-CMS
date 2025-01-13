/// <reference types="cypress" />

describe('Login Page', () => {
  beforeEach(() => {
      cy.visit('/'); 
  });

  Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('An error occurred while posting data')) {
      return false; 
    }
    return true; 
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

  it('should redirect to login page when accessing /channel while not logged in', () => {
   
    cy.visit('/channel', { failOnStatusCode: false });

    cy.url().should('eq', Cypress.config().baseUrl + '/');

    cy.get('form').should('be.visible');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
  });

  it('should redirect to /channel when accessing the base URL while logged in', () => {
    cy.intercept('POST', '/auth/login', {
      fixture: 'mocks/authLogin.json',
    }).as('loginRequest');

    cy.intercept('POST', '/content/get-range', {
      statusCode: 401, 
      body: {}, 
    }).as('getRangeRequest');
  
    cy.visit('/');
    cy.fixture('mocks/login.json').then((data) => {
      cy.get('input[name="email"]').type(data.email);
      cy.get('input[name="password"]').type(data.password);
      cy.get('#loginButton').click();
  
      cy.wait('@loginRequest');
  
      cy.url().should('include', '/channel');
  
      cy.visit('/');
  
      cy.url().should('include', '/channel');
    });
  });  
});
