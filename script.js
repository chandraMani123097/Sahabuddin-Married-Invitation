document.addEventListener("DOMContentLoaded", function () {
  // Music control
  const music = document.getElementById("weddingMusic");
  const musicToggle = document.getElementById("musicToggle");
  const musicText = document.getElementById("musicText");

  music.volume = 0.3;

  function handleMusicPlay() {
    const playPromise = music.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        musicText.textContent = "Play Music";
      });
    }
  }

  handleMusicPlay();

  musicToggle.addEventListener("click", function () {
    if (music.paused) {
      music.play();
      musicText.textContent = "Music ON";
    } else {
      music.pause();
      musicText.textContent = "Music OFF";
    }
  });

  // Create falling flowers
  function createFlowers() {
    const container = document.getElementById("flower-petals");
    const colors = ["#ffb6c1", "#ffc0cb", "#f8c8dc", "#f4acb7"];

    for (let i = 0; i < 100; i++) {
      const flower = document.createElement("div");
      flower.className = "flower";

      const size = Math.random() * 15 + 10;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = Math.random() * 10 + 5;
      const delay = Math.random() * 15;
      const x = Math.random() * 100;
      const rotation = Math.random() * 360;

      flower.style.width = `${size}px`;
      flower.style.height = `${size}px`;
      flower.style.background = `radial-gradient(ellipse, ${color} 0%, ${darkenColor(
        color,
        20
      )} 100%)`;
      flower.style.animationDuration = `${duration}s`;
      flower.style.animationDelay = `${delay}s`;
      flower.style.setProperty("--random-x", `${x}vw`);
      flower.style.transform = `rotate(${rotation}deg)`;

      container.appendChild(flower);
    }
  }

  // Create fireworks
  function createFirework(x, y) {
    const container = document.getElementById("fireworks-container");
    const colors = [
      "#ff0000",
      "#ffff00",
      "#00ff00",
      "#00ffff",
      "#ff00ff",
      "#ff9900",
      "#d4af37",
      "#b76e79",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Core explosion
    const core = document.createElement("div");
    core.className = "firework";
    core.style.left = `${x}px`;
    core.style.top = `${y}px`;
    core.style.backgroundColor = color;
    core.style.boxShadow = `0 0 10px 2px ${color}`;
    container.appendChild(core);

    anime({
      targets: core,
      scale: [0, 1],
      opacity: [1, 0],
      duration: 1000,
      easing: "easeOutExpo",
      complete: () => core.remove(),
    });

    // Create particles
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        const particle = document.createElement("div");
        particle.className = "firework-particle";
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 3;
        const tx = Math.cos(angle) * velocity * 100;
        const ty = Math.sin(angle) * velocity * 100;
        const duration = 800 + Math.random() * 700;

        particle.style.setProperty("--tx", `${tx}px`);
        particle.style.setProperty("--ty", `${ty}px`);

        anime({
          targets: particle,
          translateX: tx,
          translateY: ty,
          opacity: [1, 0],
          duration: duration,
          easing: "easeOutQuad",
          complete: () => particle.remove(),
        });
      }, Math.random() * 300);
    }
  }

  // Helper functions
  function darkenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = ((num >> 8) & 0x00ff) - amt;
    const B = (num & 0x0000ff) - amt;
    return `#${(
      0x1000000 +
      (R < 0 ? 0 : R) * 0x10000 +
      (G < 0 ? 0 : G) * 0x100 +
      (B < 0 ? 0 : B)
    )
      .toString(16)
      .slice(1)}`;
  }

  // Initialize animations
  createFlowers();

  // Auto fireworks
  setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight / 2);
    createFirework(x, y);
  }, 1500);

  // Click fireworks
  document.addEventListener("click", (e) => {
    createFirework(e.clientX, e.clientY);
  });

  // Animate names
  anime({
    targets: ".groom, .bride",
    translateY: [30, 0],
    opacity: [0, 1],
    delay: anime.stagger(200),
    duration: 1000,
    easing: "easeOutExpo",
  });

  // Floating card effect
  anime({
    targets: ".invitation-card",
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 1500,
    easing: "easeOutExpo",
  });
});
