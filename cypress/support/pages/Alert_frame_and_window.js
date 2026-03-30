class AlertFrameWindow{

    get elements(){
        return{
            btnNewWindow: () => cy.get('#windowButton'),
            msgWindow: () => cy.get('#sampleHeading')
        }
    }

    access(){
        cy.visit('/')
        cy.contains('.card', 'Alerts').click({ force: true, scrollBehavior: 'center' });
        cy.contains('.text', 'Browser Windows').click({force: true,});
        cy.get('h1.text-center').should('be.visible').and('have.text', 'Browser Windows');
    }

    abreEValidaJanela(){
        cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen');
        });
        this.elements.btnNewWindow().click();
        cy.get('@windowOpen').should('be.calledWithMatch', '/sample');
        cy.visit('/sample');
        this.elements.msgWindow().should('be.visible').and('contain', 'This is a sample page');
        cy.go('back');
    }
}

export default new AlertFrameWindow();