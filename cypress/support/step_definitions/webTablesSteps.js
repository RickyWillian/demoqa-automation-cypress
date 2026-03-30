import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import WebTablePage from '../pages/webTable';
let userList

Given("que estou na página de Web Tables", () => {
    WebTablePage.access();
    WebTablePage.elements.selectRowsPerPage().should('exist');
    WebTablePage.linhaPorPag(20);
    cy.get('tbody tr').should('have.length.at.most', 20);
});
When("eu cadastro e deleto os seguintes usuários:", (dataTable) => {
    userList = dataTable.hashes();
    cy.wrap(userList).each((user) => {
        WebTablePage.criarRegistro(user);
        WebTablePage.deletarRegistro(user.userEmail);
    });
});
Then("todos esses registros devem ser removidos da tabela", () => {
    cy.wrap(userList).each((user) => {
        cy.contains('td', user.userEmail).should('not.exist'); 
    });
});