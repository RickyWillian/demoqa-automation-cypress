class SortableInteraction{

    get elements(){
        return{
            listaItens: () => cy.get('#demo-tabpane-list .list-group-item'),
        }
    }

    access() {
        cy.visit('/')
        cy.contains('.card', 'Interactions').click({ force: true, scrollBehavior: 'center' });
        cy.contains('.text', 'Sortable').click({ force: true });
        cy.get('h1.text-center').should('be.visible').and('have.text', 'Sortable');
    }

    cresOrd(){
        const itens = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
        itens.forEach((itemAlvo, posicaoDestino) => {
            this.elements.listaItens()
                .contains(itemAlvo)
                .drag(
                    `#demo-tabpane-list .list-group-item:nth-child(${posicaoDestino + 1})`
                );
        });
    }

    validarOrdemCrescente() {
        const ordemEsperada = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
        this.elements.listaItens().each(($el, index) => {
            expect($el.text().trim()).to.equal(ordemEsperada[index]);
        });
    }
}
export default new SortableInteraction();