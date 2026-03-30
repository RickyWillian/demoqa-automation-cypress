import SortableInteraction from '../../support/pages/Sortable_interaction';

describe('Sortable com drag and drop', () => {
    before(() => {
        SortableInteraction.access();
    });

    it('Deve ordenar os itens de forma crescente', () =>{
        SortableInteraction.cresOrd();
        SortableInteraction.validarOrdemCrescente();
    });
});