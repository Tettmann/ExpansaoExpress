// ===========================================
// ROTAS.JS — específico da página Área de Atuação (areaatuacao.html)
// Mapa interativo de regiões e estados atendidos.
// Requer main.js carregado ANTES (menu/whatsapp/dropdown).
// ===========================================

document.addEventListener('DOMContentLoaded', () => {

  const regioes = {
    norte: ["Acre", "Amapá", "Amazonas", "Pará", "Rondônia", "Roraima", "Tocantins"],
    nordeste: ["Alagoas", "Bahia", "Ceará", "Maranhão", "Paraíba", "Pernambuco", "Piauí", "Rio Grande do Norte", "Sergipe"],
    "centro-oeste": ["Distrito Federal", "Goiás", "Mato Grosso", "Mato Grosso do Sul"],
    sudeste: ["Espírito Santo", "Minas Gerais", "Rio de Janeiro", "São Paulo"],
    sul: ["Paraná", "Rio Grande do Sul", "Santa Catarina"]
  };

  const zonasSp = ["Centro", "Zona Leste", "Zona Norte", "Zona Oeste", "Zona Sul"];

  const botoesRegioes = document.querySelectorAll(".btn-regiao");
  const botoesEstados = document.getElementById("botoes-estados");
  const mapaContainer = document.getElementById("mapa-container");
  const lateralGrandeSp = document.getElementById("lateral-grande-sp");

  if (!botoesEstados || !mapaContainer) return; // página não é a área de atuação

  const estadosCorrigidos = {
    "Ceará": "Fortaleza, Ceará, Brasil",
    "São Paulo": "Estado de São Paulo, Brasil"
  };

  // Inicializa os eventos dos botões de região
  botoesRegioes.forEach(botao => {
    botao.addEventListener("click", () => {
      ativarBotao(botao, ".btn-regiao");
      const regiao = botao.dataset.regiao;
      if (regiao === "sudeste") {
        // Sudeste tem tratamento especial pra abrir direto as zonas de SP
        renderEstados(regioes[regiao]);
      } else {
        renderEstados(regioes[regiao]);
      }
    });
  });

  // Renderiza os botões de estados de uma região
  function renderEstados(estados) {
    botoesEstados.innerHTML = estados
      .map(estado => `<button class="btn-estado" data-estado="${estado}">${estado}</button>`)
      .join("");

    lateralGrandeSp.innerHTML = "";

    document.querySelectorAll(".btn-estado").forEach(btn => {
      btn.addEventListener("click", () => {
        const estado = btn.dataset.estado;
        if (estado === "São Paulo") {
          mostrarMapa(estadosCorrigidos[estado] || estado);
          lateralGrandeSp.innerHTML = `
            <button id="btn-grande-sp" class="btn-estado-grande">Grande São Paulo</button>
          `;

          document.getElementById("btn-grande-sp").addEventListener("click", () => {
            renderZonasSaoPaulo();
          });
        } else {
          mostrarMapa(estadosCorrigidos[estado] || estado);
          lateralGrandeSp.innerHTML = "";
        }
      });
    });
  }

  // Renderiza os botões das zonas de SP + botão voltar
  function renderZonasSaoPaulo() {
    botoesEstados.innerHTML = `
      <button class="btn-estado btn-voltar">← Voltar</button>
      ${zonasSp.map(zona => `<button class="btn-estado" data-zona="${zona}">${zona}</button>`).join("")}
    `;

    lateralGrandeSp.innerHTML = "";

    mostrarMapa("Cidade de São Paulo, Brasil");

    document.querySelector(".btn-voltar").addEventListener("click", () => {
      renderEstados(regioes["sudeste"]);
    });

    document.querySelectorAll(".btn-estado[data-zona]").forEach(zonaBtn => {
      zonaBtn.addEventListener("click", () => {
        mostrarMapa(`${zonaBtn.dataset.zona}, São Paulo, Brasil`);
      });
    });
  }

  // Mostra mapa do Google Maps com a localização passada
  function mostrarMapa(local) {
    const query = encodeURIComponent(local);
    mapaContainer.classList.remove("mostrar");

    setTimeout(() => {
      mapaContainer.innerHTML = `
        <iframe
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAskzoiA3LW0eJICkWJy3nD6B4JoNdSPIM&q=${query}&maptype=satellite"
          allowfullscreen
        ></iframe>
      `;
      mapaContainer.classList.add("mostrar");
    }, 100);
  }

  // Utilitário: ativa botão atual e desativa outros
  function ativarBotao(botao, seletorGrupo) {
    document.querySelector(`${seletorGrupo}.ativo`)?.classList.remove("ativo");
    botao.classList.add("ativo");
  }

});
