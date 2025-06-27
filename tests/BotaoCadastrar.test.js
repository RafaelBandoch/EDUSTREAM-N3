/**
 * @jest-environment jsdom
 */

const { criarFormulario } = require('./funcoeslogicas');

test('botão cadastrar deve chamar onSubmit quando clicado', () => {
  const mockOnSubmit = jest.fn();

  const form = criarFormulario(mockOnSubmit);
  document.body.appendChild(form);

  const botao = form.querySelector('button');
  botao.click();

  expect(mockOnSubmit).toHaveBeenCalledTimes(1);
});
