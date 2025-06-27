const { validarFeedback } = require('./funcoeslogicas');

test('Feedback válido deve retornar true', () => {
  expect(validarFeedback('Gostei muito do curso!')).toBe(true);
});

test('Feedback vazio deve retornar false', () => {
  expect(validarFeedback('')).toBe(false);
});

test('feedback muito longo deve ser inválido', () => {
  const textoLongo = 'a'.repeat(501);
  expect(validarFeedback(textoLongo)).toBe(false);
});

test('Feedback com palavrão deve retornar false', () => {
  expect(validarFeedback('Esse curso é um palavrão1')).toBe(false);
});