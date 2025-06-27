const { adminInserirCurso } = require('./funcoeslogicas');
 
describe('Função adminInserirCurso', () => {
  test('Insere curso com sucesso quando todos os dados são válidos', async () => {
    const resultado = await adminInserirCurso(
      'Curso Node',
      'Curso introdutório',
      'Programação',
      20,
      150
    );
 
    expect(resultado).toEqual({
      nome: 'Curso Node',
      descricao: 'Curso introdutório',
      categoria: 'Programação',
      horas: 20,
      preco: 150
    });
  });
 
  test('Lança erro quando algum campo está vazio', async () => {
    await expect(
      adminInserirCurso('', 'desc', 'cat', 10, 100)
    ).rejects.toThrow('Todos os campos devem ser preenchidos');
  });
});