function autenticar(email, senha) {
  const usuarios = [
    { email: "teste@email.com", senha: "1234" }
  ];
  const user = usuarios.find(u => u.email === email);
  if (!user) throw new Error("Usuário não encontrado");
  if (user.senha !== senha) throw new Error("Senha incorreta");
  return true;
}

module.exports = { autenticar };
