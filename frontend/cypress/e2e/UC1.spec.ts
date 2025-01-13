/// <reference types="cypress" />
import 'cypress-file-upload';

describe('Upload content', () => {
    beforeEach(() => {
        cy.visit('/'); 
        cy.fixture('mocks/login.json').then((data) => {
            cy.intercept('POST', '/auth/login', {
                statusCode: 200,
                body: {
                    status: data.status,
                    accessToken: data.accessToken,
                },
            }).as('loginRequest');
      
            cy.get('input[name="email"]').type(data.email);
            cy.get('input[name="password"]').type(data.password);
            cy.get('#loginButton').click();
      
            cy.wait('@loginRequest');
        });
    });
  
    it('should fill in all the information', () => {
        cy.fixture('mocks/upload.json').then((data) => {
            cy.fixture(data.mockShort).then((fileContent) => {
                cy.get('#file').attachFile({
                  fileContent,
                  fileName: data.mockShort,
                  mimeType: 'video/mp4',
                });
              });
            cy.get('#next').click(); 

            cy.get('input[name="title"]').type(data.title);
            cy.get('textarea[name="description"]').type(data.description);
            cy.fixture(data.mockThumbnail, 'binary').then((fileContent) => {
                cy.get('#thumbnail').attachFile({
                  fileContent,
                  fileName: data.mockThumbnail,
                  mimeType: 'image/png', 
                });
              });  
            cy.get('#next').click(); 

            cy.get("#tags").type(data.tag)
            cy.get("#tags").type('{enter}');
            cy.get('#next').click(); 

            cy.get('#next').click(); 

            cy.get('#title').contains(data.title)
            cy.get('#description')
            cy.get('.notification').should('contain', 'Content uploaded successfully');
        });
    });
});

  