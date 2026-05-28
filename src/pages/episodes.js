// ========================================
// TASK: Página de Episodios
// Mostrar información de episodios:
// - Nombre del episodio
// - Fecha de emisión
// - Cantidad de personajes participantes
// ========================================

import { getEpisodes, getCharactersByIds } from "../services/api";
import { showError } from "../utils/helpers";

let allEpisodes = [];
let currentPage = 1;

// TASK: Renderizar lista de episodios
const renderEpisodes = async () => {
  const container = document.querySelector("#episodes-container");
  if (!container) return;

  container.innerHTML = allEpisodes
    .map(
      (episode) => `
    <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
      <h3 class="text-2xl font-bold mb-2">${episode.name}</h3>
      <p class="text-gray-600 mb-2"><strong>Episodio:</strong> ${episode.episode}</p>
      <p class="text-gray-600 mb-4"><strong>Fecha de emisión:</strong> ${episode.air_date}</p>
      <div class="bg-blue-100 p-4 rounded">
        <p class="text-blue-900 font-bold">
          Personajes participantes: <span class="text-2xl">${episode.characters.length}</span>
        </p>
      </div>
    </div>
  `
    )
    .join("");
};

// TASK: Página de episodios
export const episodesPage = async (app) => {
  app.innerHTML = `
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-gray-800 mb-8">Episodios</h1>

        <div id="pagination" class="mb-8 flex justify-center gap-2"></div>

        <div id="loading" class="text-center text-xl text-gray-600">
          Cargando episodios...
        </div>

        <div id="episodes-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 hidden"></div>
      </div>
    </div>
  `;

  // TASK: Cargar episodios iniciales
  try {
    const data = await getEpisodes(currentPage);
    allEpisodes = data.results;
    await renderEpisodes();
    document.querySelector("#loading").classList.add("hidden");
    document.querySelector("#episodes-container").classList.remove("hidden");

    // TASK: Renderizar controles de paginación
    const paginationDiv = document.querySelector("#pagination");
    if (data.info.pages > 1) {
      for (let i = 1; i <= Math.min(data.info.pages, 5); i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className =
          i === currentPage
            ? "bg-blue-500 text-white px-4 py-2 rounded"
            : "bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400";
        btn.addEventListener("click", async () => {
          currentPage = i;
          const newData = await getEpisodes(currentPage);
          allEpisodes = newData.results;
          await renderEpisodes();
        });
        paginationDiv.appendChild(btn);
      }
    }
  } catch (error) {
    showError(error.message);
    document.querySelector("#loading").textContent = "Error cargando episodios";
  }
};
