import PageWidget from '../../support/pages/page_widgets';

describe('Valiação de barra de progresso', () => {
    before(() => {
        PageWidget.access();
    });
    it('Valida barra em valor menor ou igual a 25%', () => {
        PageWidget.validaBarra(23);//criterio de parada um pouco antes, contando com o delay

        PageWidget.elements.progressBar().then(($el) =>{
            const valorFinal = parseInt($el.text().replace('%',''));
            expect(valorFinal).to.be.at.most(25);
        });
        PageWidget.finalizarEResetar();
    });
});