import "./style.css";
import { router, navigateTo } from "./router/router";

// ========================================
// TASK: Inicialización de la aplicación
// Renderizar navbar y cargar ruta actual
// ========================================

const initializeApp = () => {
  // TASK: Renderizar barra de navegación
  const navbar = document.querySelector("#navbar");
  navbar.innerHTML = `
    <nav class="bg-blue-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">Rick and Morty App</h1>
        <div class="flex gap-6">
          <a href="/" class="hover:text-blue-200 transition">Login</a>
          <a href="/characters" class="hover:text-blue-200 transition">Personajes</a>
          <a href="/episodes" class="hover:text-blue-200 transition">Episodios</a>
          <a href="/locations" class="hover:text-blue-200 transition">Ubicaciones</a>
        </div>
      </div>
    </nav>
  `;

  // TASK: Adjuntar manejadores de navegación
  navbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const path = link.getAttribute("href");
      navigateTo(path);
    });
  });
};

// TASK: Iniciar aplicación cuando el DOM esté listo
window.addEventListener("DOMContentLoaded", () => {
  initializeApp();
  router();
});

// TASK: Manejar navegación con botones atrás/adelante del navegador
window.addEventListener("popstate", router);
