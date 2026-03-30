export const UserRequests = {
    
    createUser(payload){
        return cy.request({
            method: 'POST',
            url: '/Account/v1/User',
            body: payload,
            failOnStatusCode: false
        });
    },

    geraToken(payload){
        return cy.request({
            method: 'POST',
            url: '/Account/v1/GenerateToken',
            body: payload,
            failOnStatusCode: false
        });
    },

    autorizado(payload){
        return cy.request({
            method: 'POST',
            url: '/Account/v1/Authorized',
            body: payload,
            failOnStatusCode: false
        });
    },

    listaLivros(){
        return cy.request('/BookStore/v1/Books');
    },

    addLivros(payload, token){
        return cy.request({
            method: 'POST',
            url: '/BookStore/v1/Books',
            headers:{
                Authorization: `Bearer ${token}`
            },
            body: payload,
            failOnStatusCode: false
        })
    },

    listaLivrosAlugados(id,token){
        return cy.request({
            method: 'GET',
            url: `/Account/v1/User/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        });
    },

    deleta(id, token){
          return cy.request({
            method: 'DELETE',
            url: `/Account/v1/User/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
        });
    }
};