const usuarios = [
  { id: 1, nome: "Rafael", email: "rafael@gmail.com", comprouCurso: true },
  { id: 2, nome: "João", email: "joao@gmail.com", comprouCurso: false },
];

function podeAcessarCurso(email) {
  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) {
    throw new Error("Usuário não encontrado.");
  }
  return usuario.comprouCurso;
}

module.exports = { podeAcessarCurso };
