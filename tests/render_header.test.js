/**
 * @jest-environment jsdom
 */

describe('Renderização do header do menu', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <header class="main-header">
          <div class="logo-container">
            <img src="/images/Fictional_company_logo.jpg" alt="EduStream Logo" class="logo-image">
            <span class="logo-text">EduStream</span>
          </div>
          
          <div class="search-container">
            <input type="text" placeholder="Procurar cursos" class="search-input">
            <button class="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          
          <div class="user-profile">
            <button class="profile-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
          </div>
        </header>
        
        <nav class="main-nav">
          <ul class="nav-list">
            <li class="nav-item active"><a href="#">Home</a></li>
            <li class="nav-item"><a href="/aulas_salvas">Aulas Salvas</a></li>
            <li class="nav-item"><a href="/meus_cursos">Meus Cursos</a></li>
          </ul>
        </nav>
      </div>
    `;
  });

  test('deve renderizar a logo com imagem e texto', () => {
    const imgLogo = document.querySelector('.logo-image');
    const textoLogo = document.querySelector('.logo-text');
    
    expect(imgLogo).not.toBeNull();
    expect(imgLogo.getAttribute('src')).toBe('/images/Fictional_company_logo.jpg');
    expect(imgLogo.getAttribute('alt')).toBe('EduStream Logo');
    
    expect(textoLogo).not.toBeNull();
    expect(textoLogo.textContent).toBe('EduStream');
  });

  test('deve renderizar campo de busca e botão', () => {
    const inputBusca = document.querySelector('.search-input');
    const botaoBusca = document.querySelector('.search-button');

    expect(inputBusca).not.toBeNull();
    expect(inputBusca.getAttribute('placeholder')).toBe('Procurar cursos');
    expect(botaoBusca).not.toBeNull();
  });

  test('deve renderizar botão do perfil', () => {
    const botaoPerfil = document.querySelector('.profile-button');
    expect(botaoPerfil).not.toBeNull();
  });

  test('deve renderizar links de navegação', () => {
    const links = Array.from(document.querySelectorAll('.nav-list a'));
    expect(links.length).toBe(3);
    expect(links[0].textContent).toBe('Home');
    expect(links[1].getAttribute('href')).toBe('/aulas_salvas');
    expect(links[2].getAttribute('href')).toBe('/meus_cursos');
  });
});
