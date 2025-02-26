/// <reference types="cypress" />

describe('test caesar.html', () => {
    beforeEach(() => {
        cy.visit('../../caesar.html');
    });

    it('Encrypts text correctly for key = 3', () => {
        //Compléter le formulaire
        cy.get('input[type=number]');
        cy.get('#shift').clear().type('3');
        cy.get('#text').clear().type('Hello World!'); //Retrouver par ID avec le #

        //Validation du formulaire
        cy.get('#encryptBtn').click();

        //Vérification de la réponse
        cy.get('#result').should('have.text', 'Khoor Zruog!');
    });
    
    it('Encrypts text correctly for key = 6', () => {
        //Compléter le formulaire
        cy.get('input[type=number]');
        cy.get('#shift').clear().type('6');
        cy.get('textarea').type('G'); //Retrouver par classe 'textarea'

        //Validation du formulaire
        cy.get('#encryptBtn').click();

        //Vérification de la réponse
        cy.get('#result').should('have.text', 'M');
    });

    it('Encrypts text correctly for key = 6 with custom methode', () => {
        //Compléter le formulaire
        cy.dataCy('cypher-key').clear().type('6');
        cy.dataCy('cypher-msg').type('G');

        //Validation du formulaire
        cy.dataCy('cypher-btn').click();

        //Vérification de la réponse
        cy.dataCy('cyber-result').should('have.text', 'M');
    });
});