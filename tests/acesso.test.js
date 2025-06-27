const { podeAcessarCurso } = require("./acessosimulado");

describe("Acesso ao curso", () => {
  test("deve permitir acesso se o usuário comprou o curso", () => {
    expect(podeAcessarCurso("rafael@gmail.com")).toBe(true);
  });

  test("deve negar acesso se o usuário não comprou o curso", () => {
    expect(podeAcessarCurso("joao@gmail.com")).toBe(false);
  });

  test("deve lançar erro se o usuário não for encontrado", () => {
    expect(() => podeAcessarCurso("naoexiste@email.com"))
      .toThrow("Usuário não encontrado.");
  });
});
