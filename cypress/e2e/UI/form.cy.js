import FormPage from '../../support/pages/FormPage';
describe('Desafio UI - Formulario', () => {
 let massa 
    before(()=>{
        cy.fixture('UI/dataTestForm').then((dataTest) => { 
            massa = dataTest
        });
    });

    
    it('Preencher Form',() =>{
        FormPage.access();
        FormPage.preencherForm(massa.studentData);
        FormPage.enviar();
        FormPage.validarEFecharModal(massa.studentData);
    });
});