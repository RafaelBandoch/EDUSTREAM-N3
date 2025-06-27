/**
 * @jest-environment jsdom
 */

describe('Testes das funções handler dos botões', () => {
  beforeEach(() => {
    window.open = jest.fn();
  });

  function onClickMeusCursos() {
    window.open('/meus-cursos', '_blank');
  }

  function onClickAulasSalvas() {
    window.open('/aulas-salvas', '_blank');
  }

  test('handler do botão Meus Cursos chama window.open', () => {
    onClickMeusCursos();
    expect(window.open).toHaveBeenCalledWith('/meus-cursos', '_blank');
  });

  test('handler do botão Aulas Salvas chama window.open', () => {
    onClickAulasSalvas();
    expect(window.open).toHaveBeenCalledWith('/aulas-salvas', '_blank');
  });
});
