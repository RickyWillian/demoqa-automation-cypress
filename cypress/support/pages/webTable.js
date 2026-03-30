class WebTablePage {
    get elements() {
        return {
            btnAdd: () => cy.get('#addNewRecordButton'),
            inputFirstName: () => cy.get('#firstName'),
            inputLastName: () => cy.get('#lastName'),
            inputEmail: () => cy.get('#userEmail'),
            inputAge: () => cy.get('#age'),
            inputSalary: () => cy.get('#salary'),
            inputDepartment: () => cy.get('#department'),
            btnSubmit: () => cy.get('#submit'),
            tableRow: (email) => cy.get('tbody').contains('tr', email),
            btnEdit: (email) => this.elements.tableRow(email).find('[id^="edit-record"]'),
            btnDelete: (email) => this.elements.tableRow(email).find('[id^="delete-record"]'),
            selectRowsPerPage: () => cy.get('select').filter(':visible').last(),
            inputSearchBox: () => cy.get('#searchBox'),
            btnNextPage: () => cy.get('.-next button'),
            modalContainer: () => cy.get('.modal-content'),
            btnSearchSubmit: () => cy.get('#basic-addon2'),
            tableBody: () => cy.get('tbody'),  
        }
    }

    removerAds() {
        cy.get('body').then($body => {
            const ads = $body.find('#RightSide_Advertisement');
            if (ads.length) {
            ads.remove();
            }
        });
    }


    access() {
        cy.visit('/');
        cy.contains('.card', 'Elements').click({ force: true, scrollBehavior: 'center' });
        cy.contains('.text', 'Web Tables').click({ force: true });
    }

    linhaPorPag(quantidade) {
        const qtdString = quantidade.toString();
        this.elements.selectRowsPerPage()
            .select(qtdString)
            .should('have.value', qtdString);

        // garante que a tabela atualizou
        cy.get('tbody tr').should('have.length.at.most', quantidade);
    }

    criarRegistro(dados) {
        this.elements.modalContainer().should('not.exist');

        this.elements.inputSearchBox().clear();
        this.elements.btnAdd().click();

        this.elements.modalContainer().should('be.visible');

        this.elements.inputFirstName().type(dados.firstName);
        this.elements.inputLastName().type(dados.lastName);
        this.elements.inputEmail().type(dados.userEmail);
        this.elements.inputAge().type(dados.age);
        this.elements.inputSalary().type(dados.salary);
        this.elements.inputDepartment().type(dados.department);
        this.elements.btnSubmit().click();

        this.elements.modalContainer().should('not.exist');

        // validação via busca
        this.elements.inputSearchBox().clear().type(dados.userEmail);
        this.elements.btnSearchSubmit().click();
        this.elements.tableBody({ timeout: 10000 }).should(($tbody) => {
            expect($tbody.text()).to.include(dados.userEmail);
        });
       

        this.elements.inputSearchBox().clear();
    }


    buscarRegistroNaTabela(email) {
        const procurar = () => {
            return cy.get('body').then(($body) => {

            
            if ($body.find(`td:contains("${email}")`).length > 0) {
                return true;
            }

            const nextBtn = $body.find('.-next button');

            if (nextBtn.length > 0 && !nextBtn.is(':disabled')) {
                cy.wrap(nextBtn).click();
                return procurar(); // recursivo
            }

            throw new Error(`Registro ${email} não encontrado`);
            });
        };

        return procurar();
    }

    voltarParaPrimeiraPagina() {
        function voltar() {
            return cy.get('body').then(($body) => {
            const prevBtn = $body.find('.-previous button');

            if (prevBtn.length > 0 && !prevBtn.is(':disabled')) {
                cy.wrap(prevBtn).click();
                return voltar(); // recursivo
            }
            });
        }

        return voltar();
    }

    editarRegistro(email, novoNome) {
        this.removerAds();

        cy.contains('tr', email)
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
                cy.get('[title="Edit"]')
                    .click({ force: true });
            });

        this.elements.inputFirstName().clear().type(novoNome);
        this.elements.btnSubmit().click();

        cy.contains('tr', email).should('contain', novoNome);
    }

    deletarRegistro(email) {
        this.removerAds();

        // busca usando filtro (evita paginação)
        this.elements.inputSearchBox().clear().type(email);
        this.elements.btnSearchSubmit().click();

        cy.contains('td', email, { timeout: 10000 })
            .should('be.visible')
            .parent('tr')
            .within(() => {
                cy.get('[title="Delete"]').click({ force: true });
            });

        // valida que foi removido
        cy.contains('td', email).should('not.exist');

        this.elements.inputSearchBox().clear();
    }
}

export default new WebTablePage();