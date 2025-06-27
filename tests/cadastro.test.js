const { CadastroUsuario, usuarios } = require('./cadastro');

beforeEach(() => {
  usuarios.length = 0;
  usuarios.push({ 
    email: "teste@email.com", 
    senha: "1234" 
  });
});

test('cadastro válido', async () => {
  const novo = await CadastroUsuario('novo@u.com', 'senha123');
  expect(novo).toEqual({ email: 'novo@u.com', senha: 'senha123' });

  expect(usuarios).toContainEqual({ email: 'novo@u.com', senha: 'senha123' });
});

test('cadastro com e-mail já existente lança erro', async () => {
  await expect(
    CadastroUsuario("teste@email.com", "1234")
  ).rejects.toThrow('Email teste@email.com já cadastrado');
});
