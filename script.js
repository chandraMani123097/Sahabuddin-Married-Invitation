document.addEventListener("DOMContentLoaded", function () {
  // Play wedding music
  const music = document.getElementById("weddingMusic");
  const musicToggle = document.getElementById("musicToggle");

  // Try to play music (many browsers block autoplay)
  music.volume = 0.4;
  const playPromise = music.play();

  if (playPromise !== undefined) {
    playPromise.catch((error) => {
      musicToggle.innerHTML =
        '<i class="fas fa-music"></i> <span>Click to Play Music</span>';
    });
  }

  // Toggle music button
  musicToggle.addEventListener("click", function () {
    if (music.paused) {
      music.play();
      musicToggle.innerHTML =
        '<i class="fas fa-music"></i> <span>Music ON</span>';
    } else {
      music.pause();
      musicToggle.innerHTML =
        '<i class="fas fa-music"></i> <span>Music OFF</span>';
    }
  });

  // Text animation with Anime.js
  anime.timeline({ loop: false }).add({
    targets: ".animate-character",
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 1500,
    delay: 1000,
  });

  anime({
    targets: ".animated-text .letters",
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 1500,
    delay: (el, i) => 50 * i,
  });

  // Create flower petals
  function createFlowerPetals() {
    const container = document.getElementById("flower-petals");
    const colors = ["#ffb6c1", "#ffc0cb", "#ffdfed", "#f8c8dc", "#f4acb7"];

    for (let i = 0; i < 80; i++) {
      const flower = document.createElement("div");
      flower.className = "flower";

      // Random properties
      const size = Math.random() * 12 + 8;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = Math.random() * 15 + 15;
      const delay = Math.random() * 20;
      const randomX = Math.random() * 100 - 10; // -10 to 90vw

      flower.style.width = `${size}px`;
      flower.style.height = `${size}px`;
      flower.style.background = `radial-gradient(circle, ${color} 30%, transparent 70%)`;
      flower.style.animationDuration = `${duration}s`;
      flower.style.animationDelay = `${delay}s`;
      flower.style.setProperty("--random-x", `${randomX}vw`);
      flower.style.opacity = Math.random() * 0.7 + 0.3;

      container.appendChild(flower);
    }
  }

  // Create realistic fireworks
  function createFirework(x, y, color) {
    const container = document.getElementById("fireworks-container");
    const firework = document.createElement("div");
    firework.className = "firework";
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;
    firework.style.boxShadow = `0 0 5px 2px ${color}`;
    firework.style.backgroundColor = color;
    container.appendChild(firework);

    // Explode animation
    anime({
      targets: firework,
      scale: [0, 15],
      opacity: [1, 0],
      easing: "easeOutExpo",
      duration: 1000,
      complete: () => firework.remove(),
    });

    // Create particles
    const particleCount = 50;
    const angleIncrement = (Math.PI * 2) / particleCount;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "firework-particle";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.backgroundColor = color;
      container.appendChild(particle);

      const angle = angleIncrement * i;
      const velocity = 1 + Math.random() * 3;
      const tx = Math.cos(angle) * velocity * 100;
      const ty = Math.sin(angle) * velocity * 100 + Math.random() * 50;

      particle.style.setProperty("--tx", `${tx}px`);
      particle.style.setProperty("--ty", `${ty}px`);

      anime({
        targets: particle,
        translateX: tx,
        translateY: ty,
        opacity: [1, 0],
        easing: "easeOutQuad",
        duration: 1000 + Math.random() * 500,
        complete: () => particle.remove(),
      });
    }
  }

  // Launch fireworks periodically
  function launchRandomFirework() {
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
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight / 2);
    const color = colors[Math.floor(Math.random() * colors.length)];
    createFirework(x, y, color);
  }

  // Initialize animations
  createFlowerPetals();

  // Initial fireworks
  for (let i = 0; i < 8; i++) {
    setTimeout(() => launchRandomFirework(), i * 300);
  }

  // Continuous fireworks
  setInterval(launchRandomFirework, 800);

  // Launch firework on click
  document.addEventListener("click", (e) => {
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
    createFirework(e.clientX, e.clientY, color);
  });

  // Add floating effect to card
  const card = document.querySelector(".invitation-card");
  anime({
    targets: card,
    translateY: [-10, 10],
    easing: "easeInOutSine",
    duration: 3000,
    direction: "alternate",
    loop: true,
  });
});
