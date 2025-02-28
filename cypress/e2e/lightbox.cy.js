/// <reference types="cypress" />

describe('Lightbox Test', () => {
    beforeEach(() => {
        cy.visit('../../lightbox.html');
    });

    it('1. Ouvre la lightbox au clic sur l’image', () => {
        cy.dataCy('lightbox-image').click();
        cy.get('#lightbox').should('be.visible');
    });

    it('2. Ferme la lightbox au clic en dehors', () => {
        cy.dataCy('lightbox-image').click();
        cy.dataCy('lightbox-container').should('be.visible');
        cy.get('body').click(0, 0);
        cy.dataCy('lightbox-container').should('not.be.visible');
    });

    it('3. Ajoute un "J’aime" et met à jour le compteur', () => {
        cy.dataCy('lightbox-image').click();
    
        cy.dataCy('like-button').scrollIntoView().should('be.visible').click();
    
        cy.dataCy('likes-count')
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(parseInt(text.trim())).to.eq(1);
            });
    
        cy.dataCy('like-button').should('not.be.visible');
        cy.dataCy('unlike-button').should('be.visible');
    });
    

    it('4. Supprime un "j’aime" et met à jour le compteur', () => {
        cy.dataCy('lightbox-image').click();
    
        cy.dataCy('like-button').scrollIntoView().should('be.visible').click();
        cy.dataCy('unlike-button').scrollIntoView().should('be.visible').click();
    
        cy.dataCy('likes-count').scrollIntoView().should('be.visible').invoke('text').then((text) => {
            expect(parseInt(text.trim())).to.eq(0);
        });
    
        cy.dataCy('like-button').scrollIntoView().should('be.visible');
        cy.dataCy('unlike-button').scrollIntoView().should('not.be.visible');
    });

    it('5. Ajoute un commentaire', () => {
        cy.dataCy('lightbox-image').click();
        cy.dataCy('lightbox-container').should('be.visible');
    
        cy.dataCy('comment-input').scrollIntoView().should('be.visible').click();

        cy.dataCy('comment-input').type('Cypress is awesome!');
        cy.dataCy('publish-comment-button').should('not.be.disabled').click();
        cy.dataCy('comments-container').should('contain', 'Cypress is awesome!');
    });

    it('6. Empêche d’ajouter un commentaire vide', () => {
        cy.dataCy('lightbox-image').click();
        cy.dataCy('lightbox-container').should('be.visible');

        cy.dataCy('comment-input').scrollIntoView().should('be.visible').click();

        cy.dataCy('comment-input').clear();
        cy.dataCy('publish-comment-button').should('be.disabled');
    });

    it('7. Cache et affiche les commentaires', () => {
        cy.dataCy('lightbox-image').click();
        cy.dataCy('lightbox-container').should('be.visible');

        cy.dataCy('comment-input').scrollIntoView().should('be.visible').click();

        cy.dataCy('comment-input').type('Cypress is awesome!');
        cy.dataCy('publish-comment-button').should('not.be.disabled').click();

        cy.dataCy('comment-toggle').click();
        cy.dataCy('comments-container').should('not.be.visible');
        cy.dataCy('comment-toggle').click();
        cy.dataCy('comments-container').should('be.visible');
    });

    it('8. Affiche le compteur de likes et de commentaires au survol de l’image', () => {
        //Laisser un commentaire et un like
        cy.dataCy('lightbox-image').click();
        cy.dataCy('lightbox-container').should('be.visible');
        cy.dataCy('comment-input')
        .scrollIntoView()
        .should('be.visible')
        .click()
        .type('Cypress is awesome!');
        cy.dataCy('publish-comment-button').should('not.be.disabled').click();
        cy.dataCy('like-button')
        .scrollIntoView()
        .should('be.visible')
        .click();
        cy.get('body').click(0, 0);

        cy.dataCy('image-overlay').should('not.be.visible');
    
        cy.dataCy('lightbox-image').trigger('mouseover');
    
        cy.dataCy('image-overlay').should('be.visible');
        cy.dataCy('likes-count').should('be.visible').invoke('text').then((text) => {
            expect(parseInt(text.trim())).to.eq(1);
        });
        cy.dataCy('comments-count').should('be.visible').invoke('text').then((text) => {
            expect(parseInt(text.trim())).to.eq(1);
        });
    
        cy.get('body').click(0, 0);
        //cy.dataCy('lightbox-image').trigger('mouseout');
        cy.dataCy('image-overlay').should('not.be.visible');
    });

    it("9. Tester le singulier/pluriel en fonction des commentaires", () => {
        cy.dataCy('lightbox-image').click();
        cy.dataCy('lightbox-container').should('be.visible');

        // Comment 1
        cy.dataCy('comment-input')
        .scrollIntoView()
        .should('be.visible')
        .click()
        .type('Awesome!');

        cy.dataCy('publish-comment-button').should('not.be.disabled').click();

        cy.dataCy('comment-toggle')
        .invoke('text')
        .then((text) => {
            expect(text.trim()).to.equal('Hide 1 comment');
        });

        cy.dataCy('comment-toggle').click();
        cy.dataCy('comment-toggle')
        .invoke('text')
        .then((text) => {
            expect(text.trim()).to.equal('Show 1 comment');
        });

        // Comment 2
        cy.dataCy('comment-input')
        .scrollIntoView()
        .should('be.visible')
        .click()
        .type('Magic!');

        cy.dataCy('publish-comment-button').should('not.be.disabled').click();

        cy.dataCy('comment-toggle')
        .invoke('text')
        .then((text) => {
            expect(text.trim()).to.equal('Hide 2 comments');
        });

        cy.dataCy('comment-toggle').click();
        cy.dataCy('comment-toggle')
        .invoke('text')
        .then((text) => {
            expect(text.trim()).to.equal('Show 2 comments');
        });
        
        // Overlay counter
        cy.get('body').click(0, 0);
        cy.dataCy('lightbox-image').trigger('mouseover');
        cy.dataCy('comments-count').should('be.visible').invoke('text').then((text) => {
            expect(parseInt(text.trim())).to.eq(2);
        });
    });

    it('10. Ajouter 3 commentaires et supprimer seulement le deuxième', () => {
        cy.dataCy('lightbox-image').click();
        cy.dataCy('lightbox-container').should('be.visible');

        // Comment 1
        cy.dataCy('comment-input')
        .scrollIntoView()
        .should('be.visible')
        .click()
        .type('Awesome!');

        cy.dataCy('publish-comment-button').should('not.be.disabled').click();

        // Comment 2
        cy.dataCy('comment-input')
        .scrollIntoView()
        .should('be.visible')
        .click()
        .type('Magic!');

        cy.dataCy('publish-comment-button').should('not.be.disabled').click();

        // Comment 3
        cy.dataCy('comment-input')
        .scrollIntoView()
        .should('be.visible')
        .click()
        .type('Damn!');

        cy.dataCy('publish-comment-button').should('not.be.disabled').click();

        // Supprimer le deuxième commentaire
        cy.dataCy('delete-comment-svg-1').click();

        // Vérifier que le deuxième commentaire n'est plus présent
        cy.dataCy('comments-container').should('not.contain', 'Magic!');

        // Vérifier que les autres commentaires sont toujours là
        cy.dataCy('comments-container').should('contain', 'Awesome!');
        cy.dataCy('comments-container').should('contain', 'Damn!');
    });

});