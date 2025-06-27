function validarFeedback(feedback) {
  const proibidos = ['palavrão1', 'palavrão2'];
  if (!feedback || feedback.trim() === '') return false;
  if (feedback.length > 500) return false;
  return !proibidos.some(p => feedback.toLowerCase().includes(p));
}

function gerarCertificadoSimulado(nome, curso) {
  return {
    titulo: "Certificado de Conclusão",
    mensagem: `Conferido a ${nome} pela conclusão do curso ${curso}.`,
    dados: {
      nome,
      curso,
      data: new Date().toLocaleDateString(),
    }
  };
}

function processarAcao(acao) {
  if (acao === 'salvar') return 'Curso salvo com sucesso!';
  if (acao === 'publicar') return 'Curso publicado com sucesso!';
  if (acao === 'excluir') return 'Curso excluído com sucesso!';
  throw new Error('Ação inválida!');
}

async function adminInserirCurso(nome, descricao, categoria, horas, preco) {
  if (!nome || !descricao || !categoria || !horas || !preco) {
    throw new Error('Todos os campos devem ser preenchidos');
  }
 
  console.log('Curso inserido:', nome);
  return {
    nome,
    descricao,
    categoria,
    horas,
    preco
  };
}
function criarFormulario(onSubmit) {
  const form = document.createElement('form');
  const botao = document.createElement('button');
  
  botao.type = 'submit';
  botao.textContent = 'Cadastrar';
  form.appendChild(botao);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    onSubmit();
  });

  return form;
}

module.exports = { validarFeedback, gerarCertificadoSimulado, processarAcao, criarFormulario, adminInserirCurso};