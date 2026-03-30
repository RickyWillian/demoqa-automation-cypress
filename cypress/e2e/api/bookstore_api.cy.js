import { UserRequests } from '../../support/api/user.service';

describe('Desafio Book Store API', () => {

    let userId;
    let token;
    let payload;
    let livrosLoc = [];

    before(() => {
        cy.fixture('api/user').then ((user) => {
            payload = {
                userName: `${user.userName}_${Date.now()}`,
                password: user.password
            };
            UserRequests.createUser(payload).then((resUser) => {
                expect(resUser.status).to.eq(201);
                expect(resUser.body).to.have.property('userID');
                userId = resUser.body.userID;

                UserRequests.geraToken(payload).then((resToken) => {
                    expect(resToken.status).to.eq(200);
                    expect(resToken.body.status).to.eq('Success');
                    expect(resToken.body.token).to.not.be.empty;
                    token = resToken.body.token;
                });
            });
        });
    });

    it('Validação de setup', () => {
        expect(userId).to.not.be.undefined;
        expect(token).to.not.be.undefined;
    });

    it('Validação de usuario autorizado', () => {
        UserRequests.autorizado(payload).then((resAut) =>{
            expect(resAut.status).to.eq(200);
            expect(resAut.body).to.be.true;
        });
    });

    it ('Validação da listagem de livros', () => {
        UserRequests.listaLivros().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.books).to.be.an('array');
            expect(response.body.books.length).to.be.greaterThan(0);

            response.body.books.forEach((livro) => {
                cy.log(`Livro disponivel: ${livro.title}`);
            });

            livrosLoc = [
                {isbn: response.body.books[0].isbn},
                {isbn: response.body.books[1].isbn}
            ];
        });
    });

    it('Alugar livros', () => {
        const payloadAdl = {
            userId: userId,
            collectionOfIsbns: livrosLoc
        };

        UserRequests.addLivros(payloadAdl, token).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.books).to.have.lengthOf(2);
        });
    });

    it('Listar livros alugados', () => {
        UserRequests.listaLivrosAlugados(userId, token).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.books).to.be.an('array');
            expect(response.body.books.length).to.be.at.least(1);

            const isbnsAlugados = response.body.books.map(livro => livro.isbn);

            livrosLoc.forEach((itemAlugado) => {
                expect(isbnsAlugados).to.include(itemAlugado.isbn);
                cy.log(`Livro ${itemAlugado.isbn} encontrado`);
            });
        });
        
    });

  

    after('Limpeza do ambiente', () =>{
        UserRequests.deleta(userId, token).then((response) => {
            expect(response.status).to.be.oneOf([200, 204]);
        });
    });
});