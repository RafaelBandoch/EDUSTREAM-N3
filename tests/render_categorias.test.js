/**
 * @jest-environment jsdom
 */

describe('Teste da seção de categorias', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section class="categories-section">
        <h2>Categorias:</h2>
        <div class="categories-list">
          <button class="category-btn active">Todos</button>
          <button class="category-btn">Design</button>
          <button class="category-btn">Programação</button>
          <button class="category-btn">Audiovisual</button>
          <button class="category-btn">Games</button>
          <button class="category-btn">Marketing</button>
          <button class="category-btn">Software</button>
          <button class="category-btn">Front End</button>
          <button class="category-btn">Game design</button>
          <button class="category-btn">Gestão</button>
        </div>
      </section>
    `;
  });

  test('renderiza todos os botões de categoria com os textos corretos e o primeiro ativo', () => {
    const botoes = Array.from(document.querySelectorAll('.category-btn'));
    const textosEsperados = [
      'Todos', 'Design', 'Programação', 'Audiovisual', 'Games',
      'Marketing', 'Software', 'Front End', 'Game design', 'Gestão'
    ];

    expect(botoes.length).toBe(textosEsperados.length);

    textosEsperados.forEach((texto, i) => {
      expect(botoes[i].textContent).toBe(texto);
    });

    // O primeiro botão tem a classe 'active'
    expect(botoes[0].classList.contains('active')).toBe(true);
  });
});
