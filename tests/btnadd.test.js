const { processarAcao } = require('./funcoeslogicas');

test('processarAcao retorna resultado esperado', () => {
  expect(processarAcao('salvar')).toBe('Curso salvo com sucesso!');
  expect(processarAcao('publicar')).toBe('Curso publicado com sucesso!');
  expect(processarAcao('excluir')).toBe('Curso excluído com sucesso!');
  expect(() => processarAcao('outra')).toThrow('Ação inválida!');
});
