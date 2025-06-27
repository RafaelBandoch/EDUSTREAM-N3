const { gerarCertificadoSimulado } = require('./funcoeslogicas');

describe('Geração simulada de certificado', () => {
  test('Nome e curso corretos', () => {
    const cert = gerarCertificadoSimulado('Rafael', 'Node.js Básico');

    console.log(`Certificado: ${cert.titulo} - ${cert.dados.nome} - ${cert.dados.curso}`);

    expect(cert.titulo).toBe('Certificado de Conclusão');
    expect(cert.dados.nome).toBe('Rafael');
    expect(cert.dados.curso).toBe('Node.js Básico');
  });
});
