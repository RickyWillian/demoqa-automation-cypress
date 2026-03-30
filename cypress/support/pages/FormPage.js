class FormPage{


    get formElements() {
        return{
        inputFirstName: () => cy.get('#firstName'),
        inputLastName: () => cy.get('#lastName'),
        inputEmail: () => cy.get('#userEmail'),
        inputGender: (gender) => cy.get(`input[value="${gender}"]`), // usar click({ force: true }) para evento de click
        inputPhone: () => cy.get('#userNumber'),
        inputBirthDate: () => cy.get('#dateOfBirthInput'),
        inputSubject: () => cy.get('#subjectsInput'),
        checkboxHobbies: (valor) => cy.contains('label', valor), // usar click({ force: true }) para evento de click
        uploadPic: () => cy.get('#uploadPicture'),
        inputCurAdr: () => cy.get('#currentAddress'),
        inputState: () => cy.get('#state'),// usar type(`${stateName}{enter}`, { force: true }) para preenchimento do valor 
        inputCity: () => cy.get('#city'),// usar type(`${cityName}{enter}`, { force: true }) para preenchimento do valor
        btnSubmit: () => cy.get('#submit'),
        modalContainer: () => cy.get('.modal-content'),
        modalTitle: () => cy.get('#example-modal-sizes-title-lg'),
        btnCloseModal: () => cy.get('#closeLargeModal')
        }
    }


    access(){
        cy.visit('/')
        cy.contains('.card', 'Forms').click({ force: true, scrollBehavior: 'center' });
        cy.contains('.text', 'Practice Form').click({force: true,});
        cy.get('h1.text-center').should('be.visible').and('have.text', 'Practice Form');
    }

    preencherForm(dados){
        this.formElements.inputFirstName().type(dados.firstName);
        this.formElements.inputLastName().type(dados.lastName);
        this.formElements.inputEmail().type(dados.userEmail);
        this.formElements.inputGender(dados.gender).click({force: true});
        this.formElements.inputPhone().type(dados.mobileNumber);
        this.formElements.inputBirthDate().click().type('{selectall}').type(dados.dateOfBirth).type('{enter}');
        if (dados.subjects) {
            dados.subjects.forEach((subject)=>{
                this.formElements.inputSubject().type(`${subject}{enter}`);
            });
        }
        if(dados.hobbies){
            dados.hobbies.forEach((hobby) => {
                this.formElements.checkboxHobbies(hobby).click({ force: true });
            });
        }
        this.formElements.uploadPic().selectFile(`cypress/fixtures/UI/${dados.uploadFile}`);
        this.formElements.inputCurAdr().type(dados.currentAddress);
        this.formElements.inputState().click().find('input').type(`${dados.state}{enter}`, { force: true })
        this.formElements.inputCity().should('not.have.class', 'css-16xfy0z-control-is-disabled'); //garante que o campo city esteja disponivel para receber o proximo dado
        this.formElements.inputCity().click().find('input').type(`${dados.city}{enter}`, { force: true });
    }

    enviar(){
        this.formElements.btnSubmit().click({ force: true });
    }
    validarEFecharModal(dados){
        this.formElements.modalContainer().should('be.visible');
        this.formElements.modalTitle().should('have.text', 'Thanks for submitting the form');
        cy.get('.table-responsive').should('contain', `${dados.firstName} ${dados.lastName}`);
        //this.formElements.btnCloseModal().click({ force: true });
        cy.get('body').type('{esc}');
        this.formElements.modalContainer().should('not.exist');
    }
}
export default new FormPage();