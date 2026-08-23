// ===========================================
// MAIN.JS — carregado em TODAS as páginas
// Menu mobile, botão WhatsApp, dropdown "Fale Conosco"
// e destaque do link ativo no menu.
// ===========================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Menu mobile (hambúrguer) ----
  const toggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');

  toggle?.addEventListener('click', () => {
    navbar?.classList.toggle('active');
  });

  // ---- Botão flutuante do WhatsApp ----
  const mainBtn = document.getElementById('mainBtn');
  const options = document.getElementById('options');

  mainBtn?.addEventListener('click', () => {
    if (!options) return;
    options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
  });

  // ---- Dropdown "Fale Conosco" ----
  const menuDropdownBtn = document.getElementById('menuDropdownBtn');
  const menuDropdownOptions = document.getElementById('menuDropdownOptions');

  menuDropdownBtn?.addEventListener('click', () => {
    if (!menuDropdownOptions) return;
    menuDropdownOptions.style.display =
      menuDropdownOptions.style.display === 'flex' ? 'none' : 'flex';
  });

  // Fecha o dropdown e o menu mobile se o usuário clicar fora deles
  document.addEventListener('click', (e) => {
    if (menuDropdownOptions && !e.target.closest('.dropdown')) {
      menuDropdownOptions.style.display = 'none';
    }
  });

  // ---- Destaca o link da página atual no menu ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('nav a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

});
