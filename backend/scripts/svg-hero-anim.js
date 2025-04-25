// Controla la animación de aparición/desaparición de los SVG en la hero section
// Se asume que los SVG tienen las clases .animated-svg, .svg-anim-1 y .svg-anim-2

document.addEventListener('DOMContentLoaded', function() {
  const svgs = [
    document.querySelector('.svg-anim-1'),
    document.querySelector('.svg-anim-2')
  ];
  if (!svgs[0] || !svgs[1]) return;

  let visibleIndex = 0;
  let interval = null;

  function showSVG(index) {
    svgs.forEach((svg, i) => {
      if (i === index) {
        svg.classList.add('visible');
      } else {
        svg.classList.remove('visible');
      }
    });
  }

  function randomizeNext() {
    let nextIndex = Math.floor(Math.random() * svgs.length);
    // Evita repetir el mismo SVG
    if (nextIndex === visibleIndex) {
      nextIndex = (nextIndex + 1) % svgs.length;
    }
    visibleIndex = nextIndex;
    showSVG(visibleIndex);
  }

  // Inicialmente muestra uno
  showSVG(visibleIndex);

  // Cambia cada 4-7 segundos de forma aleatoria
  // Cambia cada 1.5 a 3 segundos para mayor dinamismo
  const nextTime = Math.random() * 1500 + 1500;
  interval = setInterval(() => {
    randomizeNext();
    setRandomInterval();
  }, nextTime);

  // Opcional: al pasar el mouse sobre la hero-section, muestra ambos SVG
  const hero = document.querySelector('.hero-section');
  if (hero) {
    hero.addEventListener('mouseenter', () => {
      svgs.forEach(svg => svg.classList.add('visible'));
    });
    hero.addEventListener('mouseleave', () => {
      showSVG(visibleIndex);
    });
  }
});