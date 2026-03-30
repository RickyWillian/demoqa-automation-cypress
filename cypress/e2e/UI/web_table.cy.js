import WebTablePage from '../../support/pages/webTable';

describe('Cenário: Web Tables CRUD', () => {
    let massa;

    
   it('Deve criar, editar e deletar um registro com sucesso', () => {
    cy.fixture('UI/webTable').then((massa) => {

        WebTablePage.access();

        WebTablePage.criarRegistro(massa.newUser);

        WebTablePage.editarRegistro(
            massa.newUser.userEmail,
            massa.editUpdate.newName
        );

        WebTablePage.deletarRegistro(massa.newUser.userEmail);

        cy.contains('td', massa.newUser.userEmail).should('not.exist');
    });
});
});