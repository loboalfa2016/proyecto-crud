// ========================================
// TASK: Sistema de enrutamiento SPA
// Gestionar navegación sin recargar página
// Protección de rutas con autenticación
// ========================================

import { loginPage } from "../pages/login";
import { charactersPage } from "../pages/characters";
import { episodesPage } from "../pages/episodes";
import { locationsPage } from "../pages/locations";
import { isLoggedIn } from "../services/state";

// TASK: Definir rutas disponibles
const routes = {
  "/": loginPage,
  "/characters": charactersPage,
  "/episodes": episodesPage,
  "/locations": locationsPage,
};

// TASK: Rutas protegidas (requieren autenticación)
const protectedRoutes = ["/characters", "/episodes", "/locations"];

// TASK: Navegar a una ruta específica
export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

// TASK: Resolver y renderizar la ruta actual
export const router = async () => {
  const app = document.querySelector("#app");

  const path = window.location.pathname;
  console.log({ path });

  // TASK: Proteger rutas que requieren autenticación
  if (protectedRoutes.includes(path) && !isLoggedIn()) {
    history.pushState({}, "", "/");
    router();
    return;
  }

  const page = routes[path];

  if (!page) {
    app.innerHTML = "<h1 class='text-4xl font-bold p-8'>404 - Página no encontrada</h1>";
    return;
  }

  await page(app);
  
  // TASK: Actualizar navegación activa
  updateActiveNav(path);
};

// TASK: Actualizar estado de la navegación
export const updateActiveNav = (path) => {
  const navLinks = document.querySelectorAll("#navbar a");
  if (navLinks.length === 0) return;

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path) {
      link.classList.add("border-b-2", "border-white");
    } else {
      link.classList.remove("border-b-2", "border-white");
    }
  });
};
