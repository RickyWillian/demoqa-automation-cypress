class PageWidgets {
    get elements() {
        return {
          btnStartStop: (options = {}) => cy.get('#startStopButton', options),
            progressBar: (options = {}) => cy.get('.progress-bar', options),
            resetButton: (options = {}) => cy.get('#resetButton', options)
        }
    }

    access() {
        cy.visit('/')
        cy.contains('.card', 'Widgets').click({ force: true, scrollBehavior: 'center' });
        cy.contains('.text', 'Progress Bar').click({ force: true });
        cy.get('h1.text-center').should('be.visible').and('have.text', 'Progress Bar');
    }

    validaBarra(valorEsperado) {
        this.elements.btnStartStop().click({ force: true });
        this.elements.progressBar({ timeout: 30000 }).should(($el) => {
            const valorAtual = parseInt($el.text().replace('%', ''));
            expect(valorAtual).to.be.at.least(valorEsperado);
        });
        this.elements.btnStartStop().click();
    }

    finalizarEResetar() {
    this.elements.btnStartStop().click({ force: true });
    this.elements.progressBar({ timeout: 60000 }).should('have.text', '100%');
    cy.wait(500);//tempo de renderização do botão reset
    this.elements.resetButton({ timeout: 10000 })
        .should('be.visible')
        .and('not.be.disabled')
        .click();
    this.elements.btnStartStop({ timeout: 10000 })
        .should('be.visible')
        .and('have.text', 'Start');
    this.elements.progressBar().should('have.text', '0%');
}
}

export default new PageWidgets();