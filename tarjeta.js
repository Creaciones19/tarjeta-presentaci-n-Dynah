document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Carruseles normales (no tipo libro)
  const carruseles = document.querySelectorAll(".carousel:not(.libro)");

  carruseles.forEach((carousel) => {
    const images = carousel.querySelectorAll("img");
    let index = 0;

    // Mostrar solo la primera imagen
    images.forEach((img, i) => {
      img.classList.toggle("active", i === 0);
    });

    // Cambiar cada 4 segundos
    setInterval(() => {
      images[index].classList.remove("active");
      index = (index + 1) % images.length;
      images[index].classList.add("active");
    }, 4000);
  });

  // 🔹 Carrusel tipo libro con pausa/reproducción
  const carruselesLibro = document.querySelectorAll(".carousel.libro");

  carruselesLibro.forEach((carousel) => {
    const images = carousel.querySelectorAll("img");
    const pauseBtn = carousel.querySelector("#pause-btn"); // 🔹 Usa el botón del HTML

    let index = 0;
    let paused = false;
    let intervalId = null;

    // Mostrar la primera imagen
    images[0].classList.add("active");

    // Función que muestra la siguiente imagen
    const nextImage = () => {
      if (paused) return;
      const prevIndex = index;
      index = (index + 1) % images.length;

      images.forEach((img) => img.classList.remove("active", "prev"));
      images[prevIndex].classList.add("prev");
      images[index].classList.add("active");
    };

    // Iniciar el carrusel
    const startCarousel = () => {
      if (!intervalId) {
        intervalId = setInterval(nextImage, 4000);
      }
    };

    // Detener el carrusel
    const stopCarousel = () => {
      clearInterval(intervalId);
      intervalId = null;
    };

    // Alternar pausa/play
    pauseBtn.addEventListener("click", () => {
      paused = !paused;
      pauseBtn.textContent = paused ? "▶️" : "⏸️";

      if (paused) {
        stopCarousel();
      } else {
        startCarousel();
      }
    });

    // Inicializa el movimiento automático
    startCarousel();
  });
});
