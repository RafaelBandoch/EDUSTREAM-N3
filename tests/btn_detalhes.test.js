/**
 * @jest-environment jsdom
 */

test('clicar no botão abre uma nova página', () => {
  // Define o HTML com o botão e o handler no onclick
  document.body.innerHTML = `
    <button id="maisInfo">Mais Sobre o curso</button>
  `;

  // Mock da função window.open
  window.open = jest.fn();

  // Associa o clique do botão à função que abre página nova
  const botao = document.getElementById('maisInfo');
  botao.addEventListener('click', () => {
    window.open('https://exemplo.com', '_blank');
  });

  // Simula o clique no botão
  botao.click();

  // Verifica se window.open foi chamado uma vez com os parâmetros corretos
  expect(window.open).toHaveBeenCalledWith('https://exemplo.com', '_blank');
  expect(window.open).toHaveBeenCalledTimes(1);
});
