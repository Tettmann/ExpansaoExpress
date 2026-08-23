// ===========================================
// HOME.JS — específico da página inicial (index.html)
// Linha do tempo, contadores animados, efeito nos cards
// e carrossel de comentários.
// Requer main.js carregado ANTES (menu/whatsapp/dropdown).
// ===========================================

document.addEventListener('DOMContentLoaded', () => {

  // =======================
  // Carrossel de comentários
  // =======================
  const comments = document.querySelectorAll('.comment');
  let current = 0;

  const updateClasses = () => {
    comments.forEach((comment, i) => {
      comment.className = 'comment';
      const left = (current - 1 + comments.length) % comments.length;
      const right = (current + 1) % comments.length;

      if (i === left) comment.classList.add('left');
      else if (i === current) comment.classList.add('center');
      else if (i === right) comment.classList.add('right');
    });
  };

  if (comments.length) {
    updateClasses();
    setInterval(() => {
      current = (current + 1) % comments.length;
      updateClasses();
    }, 3000);
  }

  // =======================
  // Cards com efeito interativo (tilt no mouse)
  // =======================
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const offsetX = (e.clientX - rect.left - rect.width / 2) / 10;
      const offsetY = (e.clientY - rect.top - rect.height / 2) / 10;
      card.style.boxShadow = `${-offsetX}px ${-offsetY}px 30px rgba(255,165,0,0.5)`;
      card.style.transform = `rotateX(${offsetY}deg) rotateY(${offsetX}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = 'none';
      card.style.transform = 'none';
    });
  });

  // =======================
  // Linha do tempo (moto)
  // =======================
  const moto = document.getElementById('moto');
  const yearTexts = document.querySelectorAll('.year-text');
  const yearBtns = document.querySelectorAll('.year-btn');
  const modal = document.getElementById('yearModal');
  const modalImg = document.getElementById('modalImage');
  const modalText = document.getElementById('modalText');
  const closeModal = document.getElementById('closeModal');

  // ATENÇÃO: apenas "img/001.png" foi enviado. As demais imagens da linha
  // do tempo (1910, 1935, 1955, 1975, 1985, 2001, 2012, 2020, 2022) ainda
  // não existem — troque os caminhos abaixo assim que tiver as fotos reais.
  const timeline = [
    { percent: 10, image: 'img/001.png', cssClass: 'moto2000', index: 0 },
    { percent: 20, image: 'img/001.png', cssClass: 'moto2001', index: 1 },
    { percent: 30, image: 'img/001.png', cssClass: 'moto2005', index: 2 },
    { percent: 40, image: 'img/001.png', cssClass: 'moto2006', index: 3 },
    { percent: 50, image: 'img/001.png', cssClass: 'moto2010', index: 4 },
    { percent: 60, image: 'img/001.png', cssClass: 'moto2016', index: 5 },
    { percent: 70, image: 'img/001.png', cssClass: 'moto2015', index: 6 },
    { percent: 80, image: 'img/001.png', cssClass: 'moto2019', index: 7 },
    { percent: 90, image: 'img/001.png', cssClass: 'moto2020', index: 8 },
    { percent: 100, image: 'img/001.png', cssClass: 'moto2030', index: 9 }
  ];

  const yearDetails = [
    { image: 'img/001.png', text: '1885: A primeira moto do mundo, com motor a gasolina e estrutura de madeira.' },
    { image: 'img/001.png', text: '1910: As motos começam a ser importadas para o Brasil, ainda sem uso comercial.' },
    { image: 'img/001.png', text: '1935: O uso militar cresce, mas ainda sem foco em transporte urbano no país.' },
    { image: 'img/001.png', text: '1955: A marca japonesa inicia a revolução da mobilidade urbana acessível.' },
    { image: 'img/001.png', text: '1975: Uma das primeiras superbikes, símbolo de potência e design agressivo.' },
    { image: 'img/001.png', text: '1985: O motofrete se fortalece em São Paulo e Rio, ainda sem regulamentação clara.' },
    { image: 'img/001.png', text: '2001: A moto mais usada por motofretistas. Começa a expansão nacional do setor.' },
    { image: 'img/001.png', text: '2012: Os avanços tecnológicos tornam o transporte mais eficiente. Demanda urbana explode.' },
    { image: 'img/001.png', text: '2020: A regulamentação federal do motofrete (Lei 12.009/2009) entra em vigor nos estados.' },
    { image: 'img/001.png', text: '2022: Surge a Expansão Express: Líder em entregas com tecnologia avançada e rastreamento em tempo real.' }
  ];

  let index = 0;
  let animationStarted = false;
  let moveMotoTimeout = null;

  const moveMoto = () => {
    if (!moto || index >= timeline.length) return;
    const stop = timeline[index];
    const container = document.querySelector('.timeline-container');
    if (!container) return;
    const pixelPosition = (container.clientWidth * stop.percent) / 100 - (parseInt(getComputedStyle(moto).width) / 2);
    moto.style.transform = `translateX(${pixelPosition}px)`;

    yearBtns.forEach(btn => btn.classList.remove('visible'));
    yearTexts.forEach(t => t.classList.remove('visible'));
    yearBtns[stop.index]?.classList.add('visible');

    setTimeout(() => {
      moto.src = stop.image;
      moto.className = `moto ${stop.cssClass}`;
      yearTexts[stop.index]?.classList.add('visible');

      moveMotoTimeout = setTimeout(() => {
        if (modal && modal.classList.contains('hidden') && index < timeline.length) {
          yearBtns[stop.index].classList.remove('visible');
          yearTexts[stop.index].classList.remove('visible');
          index++;
          moveMoto();
        }
      }, 6000);
    }, 2000);
  };

  const resetAnimation = () => {
    if (!moto) return;
    index = 0;
    moto.src = timeline[0].image;
    moto.className = `moto ${timeline[0].cssClass}`;
    moto.style.transform = 'translateX(0px)';
    yearTexts.forEach(t => t.classList.remove('visible'));
    if (moveMotoTimeout) clearTimeout(moveMotoTimeout);
    animationStarted = false;
  };

  const goToIndex = (i) => {
    if (!moto || i < 0 || i >= timeline.length) return;
    if (moveMotoTimeout) clearTimeout(moveMotoTimeout);
    animationStarted = true;
    index = i + 1;

    const stop = timeline[i];
    const container = document.querySelector('.timeline-container');
    if (!container) return;
    const pixelPosition = (container.clientWidth * stop.percent) / 100 - (parseInt(getComputedStyle(moto).width) / 2);
    moto.style.transition = 'none';
    moto.style.transform = `translateX(${pixelPosition}px)`;
    moto.src = stop.image;
    moto.className = `moto ${stop.cssClass}`;

    yearBtns.forEach(btn => btn.classList.remove('visible'));
    yearBtns[stop.index]?.classList.add('visible');

    requestAnimationFrame(() => {
      moto.style.transition = 'transform 3s ease-in-out, top 0.5s ease';
    });
  };

  const container = document.querySelector('.timeline-container');
  if (container && moto) {
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animationStarted) {
            animationStarted = true;
            moveMoto();
          }
        });
      }, { threshold: 0.1 }).observe(container);
    } else {
      moveMoto();
    }
  }

  document.querySelectorAll('.year-marker')?.forEach(marker => {
    marker.addEventListener('click', () => {
      const idx = parseInt(marker.getAttribute('data-index'));
      goToIndex(idx);
    });
  });

  yearBtns?.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'));
      if (!modal || !modalImg || !modalText) return;
      modal.classList.remove('hidden');
      modalImg.src = yearDetails[idx].image;
      modalText.textContent = yearDetails[idx].text;
      if (moveMotoTimeout) clearTimeout(moveMotoTimeout);
    });
  });

  closeModal?.addEventListener('click', () => {
    modal?.classList.add('hidden');
    if (animationStarted && index < timeline.length) {
      moveMotoTimeout = setTimeout(moveMoto, 1000);
    }
  });

  window.addEventListener('resize', () => {
    if (!container) return;
    resetAnimation();
    setTimeout(() => {
      const rect = container.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0 && !animationStarted) {
        animationStarted = true;
        moveMoto();
      }
    }, 500);
  });

  // =======================
  // Contadores animados
  // =======================
  const counters = document.querySelectorAll('.numero');
  const formatNumber = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target').replace(/\./g, '');
      const isTempoEntrega = counter.classList.contains('tempo-entrega');
      const update = () => {
        const current = +counter.innerText.replace(/[^\d]/g, '') || 0;
        const inc = target / 200;
        if (current < target) {
          const newVal = Math.ceil(current + inc);
          counter.innerText = isTempoEntrega ? `${newVal}min` : formatNumber(newVal);
          setTimeout(update, 40);
        } else {
          counter.innerText = isTempoEntrega ? `${target}min` : formatNumber(target);
        }
      };
      update();
    });
  };

  const isInViewport = (el) => {
    if (!el) return false;
    const elementTop = el.offsetTop;
    const elementBottom = elementTop + el.offsetHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const viewportBottom = scrollY + window.innerHeight;
    return viewportBottom > elementTop && scrollY < elementBottom;
  };

  let countersStarted = false;
  const numerosSection = document.querySelector('.numeros-section');

  const checkAndAnimate = () => {
    if (!countersStarted && isInViewport(numerosSection)) {
      countersStarted = true;
      animateCounters();
    }
  };

  window.addEventListener('scroll', checkAndAnimate);
  window.addEventListener('resize', checkAndAnimate);
  window.addEventListener('orientationchange', checkAndAnimate);
  window.addEventListener('touchmove', checkAndAnimate, { passive: true });

  checkAndAnimate();
  setTimeout(() => {
    if (!countersStarted) animateCounters();
  }, 1500);

});
