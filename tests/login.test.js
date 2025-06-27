const { autenticar } = require('./login');

test('login com credenciais corretas', () => {
  expect(autenticar("teste@email.com", "1234")).toBe(true);
});

test('login com senha errada', () => {
  expect(() => autenticar("teste@email.com", "errada"))
    .toThrow("Senha incorreta");
});

test('login com usuário inexistente', () => {
  expect(() => autenticar("naoexiste@email.com", "1234"))
    .toThrow("Usuário não encontrado");
});
