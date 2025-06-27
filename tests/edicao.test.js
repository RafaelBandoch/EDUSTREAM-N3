const { adminEditarCurso } = require('./funcoeslogicas');
 
jest.mock('./funcoeslogicas', () => ({
  adminEditarCurso: jest.fn(),
}));
 
describe('Editar curso', () => {
  test('Deve editar curso com dados válidos', async () => {
    adminEditarCurso.mockResolvedValue(true);
 
    const id = '123';
    const curnome = 'Curso Teste';
    const curdescricao = 'Descrição do curso';
    const curcategoria = 'Categoria X';
    const curhoras = 10;
    const curpreco = 150;
 
    const resultado = await adminEditarCurso(id, curnome, curdescricao, curcategoria, curhoras, curpreco);
 
    expect(resultado).toBe(true);
 
    expect(adminEditarCurso).toHaveBeenCalledWith(id, curnome, curdescricao, curcategoria, curhoras, curpreco);
  });
 
  test('Deve lançar erro se id não for passado', async () => {
    adminEditarCurso.mockRejectedValue(new Error('ID do curso é obrigatório'));
 
    await expect(adminEditarCurso(null, 'nome', 'desc', 'cat', 10, 100))
      .rejects
      .toThrow('ID do curso é obrigatório');
  });
});