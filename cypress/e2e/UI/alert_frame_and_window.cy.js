import AlertFrameWindow from '../../support/pages/alert_frame_and_window';
describe('Desafio UI - Window', () => {
    before(()=>{

    });
    
    it('Validar abertura de nova janela',() => {
        AlertFrameWindow.access();
        AlertFrameWindow.abreEValidaJanela();
    });

});