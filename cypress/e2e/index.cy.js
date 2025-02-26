/// <reference types="cypress" />

describe('test index.html', () => {
    beforeEach(() => {
        cy.visit('../../index.html');
    });

    it('p should have text Hello World!', () => {
        cy.get('p').should('have.text', 'Hello World!');
    });
});