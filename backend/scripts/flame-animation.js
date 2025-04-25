// Animación de flamas para el banner usando PixiJS
// Asegúrate de incluir PixiJS en tu HTML antes de este script

window.addEventListener('DOMContentLoaded', function() {
  const banner = document.querySelector('.hero-section');
  if (!banner) return;

  // Crear contenedor para el canvas de Pixi
  let flameContainer = document.getElementById('flame-animation-container');
  if (!flameContainer) {
    flameContainer = document.createElement('div');
    flameContainer.id = 'flame-animation-container';
    flameContainer.style.position = 'absolute';
    flameContainer.style.top = '0';
    flameContainer.style.left = '0';
    flameContainer.style.width = '100%';
    flameContainer.style.height = '100%';
    flameContainer.style.pointerEvents = 'none';
    flameContainer.style.zIndex = '1';
    banner.style.position = 'relative';
    banner.appendChild(flameContainer);
  }

  // Inicializar PixiJS
  const app = new PIXI.Application({
    width: banner.offsetWidth,
    height: banner.offsetHeight,
    transparent: true,
    antialias: true,
    resizeTo: flameContainer
  });
  flameContainer.appendChild(app.view);

  // Crear partículas de flama
  const flameParticles = [];
  const colors = [0xffe066, 0xffb347, 0xff7043, 0xff3c00];
  const particleCount = 40;

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  for (let i = 0; i < particleCount; i++) {
    const graphics = new PIXI.Graphics();
    const color = colors[Math.floor(Math.random() * colors.length)];
    graphics.beginFill(color, randomBetween(0.5, 0.9));
    graphics.drawEllipse(0, 0, randomBetween(12, 28), randomBetween(24, 48));
    graphics.endFill();
    graphics.x = randomBetween(app.screen.width * 0.3, app.screen.width * 0.7);
    graphics.y = app.screen.height - randomBetween(30, 80);
    graphics.alpha = randomBetween(0.5, 0.9);
    graphics.scale.set(randomBetween(0.7, 1.2));
    app.stage.addChild(graphics);
    flameParticles.push({
      sprite: graphics,
      baseX: graphics.x,
      baseY: graphics.y,
      speed: randomBetween(0.7, 1.5),
      sway: randomBetween(10, 40),
      swaySpeed: randomBetween(0.01, 0.03),
      t: Math.random() * Math.PI * 2
    });
  }

  // Animar partículas
  app.ticker.add(() => {
    for (const p of flameParticles) {
      p.t += p.swaySpeed;
      p.sprite.y -= p.speed;
      p.sprite.x = p.baseX + Math.sin(p.t) * p.sway;
      p.sprite.alpha -= 0.002 * p.speed;
      if (p.sprite.y < app.screen.height * 0.2 || p.sprite.alpha <= 0.1) {
        // Reiniciar partícula
        p.sprite.y = app.screen.height - randomBetween(30, 80);
        p.sprite.x = randomBetween(app.screen.width * 0.3, app.screen.width * 0.7);
        p.sprite.alpha = randomBetween(0.5, 0.9);
        p.t = Math.random() * Math.PI * 2;
      }
    }
  });

  // Ajustar tamaño al redimensionar
  window.addEventListener('resize', () => {
    app.renderer.resize(banner.offsetWidth, banner.offsetHeight);
  });
});