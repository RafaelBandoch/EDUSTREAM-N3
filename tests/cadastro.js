const usuarios = [{ email: "teste@email.com", senha: "1234" }];

async function CadastroUsuario(email, senha) {
  const existe = usuarios.some(u => u.email === email);
  if (existe) {
    const err = new Error(`Email ${email} já cadastrado`);
    err.code = 'ER_DUP_ENTRY';
    throw err;
  }
  usuarios.push({ email, senha });

  return { email, senha };
}

module.exports = { CadastroUsuario, usuarios };