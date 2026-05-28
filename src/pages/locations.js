// ========================================
// TASK: Página de Ubicaciones
// Mostrar información de locaciones:
// - Nombre
// - Tipo
// - Dimensión
// - Cantidad de residentes
// ========================================

import { getLocations } from "../services/api";
import { showError } from "../utils/helpers";

let allLocations = [];
let currentPage = 1;

// TASK: Renderizar lista de ubicaciones
const renderLocations = () => {
  const container = document.querySelector("#locations-container");
  if (!container) return;

  container.innerHTML = allLocations
    .map(
      (location) => `
    <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
      <h3 class="text-2xl font-bold mb-4">${location.name}</h3>
      <div class="space-y-2">
        <p class="text-gray-700">
          <strong class="text-gray-900">Tipo:</strong> ${location.type}
        </p>
        <p class="text-gray-700">
          <strong class="text-gray-900">Dimensión:</strong> ${location.dimension}
        </p>
        <div class="bg-green-100 p-4 rounded mt-4">
          <p class="text-green-900 font-bold">
            Residentes: <span class="text-2xl">${location.residents.length}</span>
          </p>
        </div>
      </div>
    </div>
  `
    )
    .join("");
};

// TASK: Página de ubicaciones
export const locationsPage = async (app) => {
  app.innerHTML = `
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-gray-800 mb-8">Ubicaciones</h1>

        <div id="pagination" class="mb-8 flex justify-center gap-2"></div>

        <div id="loading" class="text-center text-xl text-gray-600">
          Cargando ubicaciones...
        </div>

        <div id="locations-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 hidden"></div>
      </div>
    </div>
  `;

  // TASK: Cargar ubicaciones iniciales
  try {
    const data = await getLocations(currentPage);
    allLocations = data.results;
    renderLocations();
    document.querySelector("#loading").classList.add("hidden");
    document.querySelector("#locations-container").classList.remove("hidden");

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
          const newData = await getLocations(currentPage);
          allLocations = newData.results;
          renderLocations();
        });
        paginationDiv.appendChild(btn);
      }
    }
  } catch (error) {
    showError(error.message);
    document.querySelector("#loading").textContent = "Error cargando ubicaciones";
  }
};
