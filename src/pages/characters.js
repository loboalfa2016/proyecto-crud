import { navigateTo } from "../router/router";

// ========================================
// TASK: Página de Personajes
// Mostrar, crear, editar y eliminar
// personajes de la API y creados localmente
// ========================================

import {
  getCharacters,
  getCharactersByIds,
} from "../services/api";
import {
  getCreatedCharacters,
  getEditedCharacters,
  addCreatedCharacter,
  removeCreatedCharacter,
  updateEditedCharacter,
  removeEditedCharacter,
  isCustomCharacter,
  getMergedCharacter,
} from "../services/state";
import {
  showSuccess,
  showError,
  confirmDelete,
  handleImageError,
  validateCharacterForm,
} from "../utils/helpers";

let allCharacters = [];
let currentPage = 1;

const renderCharacters = () => {
  const container = document.querySelector("#characters-container");
  if (!container) return;

  // TASK: Obtener datos combinados (API + locales + ediciones)
  const apiCharacters = allCharacters;
  const createdCharacters = getCreatedCharacters();
  const editedCharacters = getEditedCharacters();

  const characters = [
    ...apiCharacters.map((char) => getMergedCharacter(char)),
    ...createdCharacters,
  ];

  container.innerHTML = characters
    .map(
      (char) => `
    <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition w-full max-w-sm mx-auto">
      <img 
        src="${char.image}" 
        alt="${char.name}"
        onerror="window.handleImageError?.(event)"
        class="w-full h-64 object-cover"
      />
      <div class="p-4">
        <h3 class="text-xl font-bold mb-2">${char.name}</h3>
        <p class="text-gray-600 mb-1"><strong>Especie:</strong> ${char.species}</p>
        <p class="text-gray-600 mb-1"><strong>Género:</strong> ${char.gender}</p>
        <p class="text-gray-600 mb-4">
          <strong>Estado:</strong> 
          <span class="px-2 py-1 rounded text-white ${
            char.status === "Alive"
              ? "bg-green-500"
              : char.status === "Dead"
                ? "bg-red-500"
                : "bg-gray-500"
          }">
            ${char.status}
          </span>
        </p>
        <div class="flex gap-2">
          <button 
            class="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 edit-btn"
            data-id="${char.id}"
          >
            Editar
          </button>
          <button 
            class="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 delete-btn"
            data-id="${char.id}"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // TASK: Adjuntar manejadores de eventos a botones
  container.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const character = characters.find((c) => c.id === parseInt(id) || c.id === id);
      showEditForm(character);
    });
  });

  container.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      handleDeleteCharacter(parseInt(id) || id);
    });
  });
};

// TASK: Manejar eliminación de personajes
const handleDeleteCharacter = (id) => {
  if (!confirmDelete()) return;

  if (isCustomCharacter(id)) {
    // TASK: Eliminar personaje personalizado
    removeCreatedCharacter(id);
  } else {
    // TASK: Eliminar personaje de API (marcar como eliminado)
    removeEditedCharacter(id);
  }

  showSuccess("Personaje eliminado correctamente");
  renderCharacters();
};

// TASK: Mostrar formulario de edición
const showEditForm = (character) => {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  modal.innerHTML = `
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4">Editar Personaje</h2>
      <form id="edit-form">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Nombre</label>
          <input 
            type="text" 
            name="name" 
            value="${character.name}"
            class="w-full border rounded px-3 py-2"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Especie</label>
          <input 
            type="text" 
            name="species" 
            value="${character.species}"
            class="w-full border rounded px-3 py-2"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Estado</label>
          <select name="status" class="w-full border rounded px-3 py-2">
            <option value="Alive" ${character.status === "Alive" ? "selected" : ""}>Vivo</option>
            <option value="Dead" ${character.status === "Dead" ? "selected" : ""}>Muerto</option>
            <option value="unknown" ${character.status === "unknown" ? "selected" : ""}>Desconocido</option>
          </select>
        </div>
        <div class="flex gap-2">
          <button type="submit" class="flex-1 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600">
            Guardar
          </button>
          <button type="button" id="cancel-btn" class="flex-1 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  // TASK: Manejar envío del formulario de edición
  modal.querySelector("#edit-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = {
      name: formData.get("name"),
      species: formData.get("species"),
      status: formData.get("status"),
    };

    updateEditedCharacter(character.id, updates);
    showSuccess("Personaje actualizado correctamente");
    modal.remove();
    renderCharacters();
  });

  modal.querySelector("#cancel-btn").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
};

// TASK: Mostrar formulario de creación de personaje
const showCreateForm = () => {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  modal.innerHTML = `
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4">Crear Personaje</h2>
      <form id="create-form">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Nombre</label>
          <input 
            type="text" 
            name="name"
            placeholder="Ej: Nuevo Personaje"
            class="w-full border rounded px-3 py-2"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Especie</label>
          <input 
            type="text" 
            name="species"
            placeholder="Ej: Human"
            class="w-full border rounded px-3 py-2"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Género</label>
          <select name="gender" class="w-full border rounded px-3 py-2">
            <option value="">Seleccionar...</option>
            <option value="Male">Masculino</option>
            <option value="Female">Femenino</option>
            <option value="Genderless">Sin género</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">Estado</label>
          <select name="status" class="w-full border rounded px-3 py-2">
            <option value="Alive">Vivo</option>
            <option value="Dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">URL Imagen</label>
          <input 
            type="url" 
            name="image"
            placeholder="https://..."
            class="w-full border rounded px-3 py-2"
          />
        </div>
        <div id="errors-list" class="mb-4 text-red-500 text-sm"></div>
        <div class="flex gap-2">
          <button type="submit" class="flex-1 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600">
            Crear
          </button>
          <button type="button" id="cancel-btn" class="flex-1 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  // TASK: Manejar envío del formulario de creación
  modal.querySelector("#create-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const characterData = {
      name: formData.get("name"),
      species: formData.get("species"),
      gender: formData.get("gender"),
      status: formData.get("status"),
      image: formData.get("image"),
    };

    const errors = validateCharacterForm(characterData);

    if (errors.length > 0) {
      const errorsList = modal.querySelector("#errors-list");
      errorsList.innerHTML = errors.map((err) => `<p>• ${err}</p>`).join("");
      return;
    }

    addCreatedCharacter(characterData);
    showSuccess("Personaje creado correctamente");
    modal.remove();
    renderCharacters();
  });

  modal.querySelector("#cancel-btn").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
};

// TASK: Página principal de personajes
export const charactersPage = async (app) => {
  app.innerHTML = `
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container mx-auto px-4">
        <div class="mb-8 flex justify-between items-center">
          <h1 class="text-4xl font-bold text-gray-800">Personajes</h1>
          <button 
            id="create-btn"
            class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
          >
            + Crear Personaje
          </button>
        </div>

        <div id="pagination" class="mb-8 flex justify-center gap-2"></div>

        <div id="loading" class="text-center text-xl text-gray-600">
          Cargando personajes...
        </div>

        <div class="flex justify-center">
          <div id="characters-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-6 w-full max-w-7xl" style="display:none;"></div>
        </div>
      </div>
    </div>
  `;

  // TASK: Cargar personajes iniciales
  try {
    const data = await getCharacters(currentPage);
    allCharacters = data.results;
    renderCharacters();
    document.querySelector("#loading").classList.add("hidden");
    document.querySelector("#characters-container").style.display = "";

    // TASK: Renderizar paginación
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
          const newData = await getCharacters(currentPage);
          allCharacters = newData.results;
          renderCharacters();
        });
        paginationDiv.appendChild(btn);
      }
    }
  } catch (error) {
    showError(error.message);
    document.querySelector("#loading").textContent = "Error cargando personajes";
  }

  // TASK: Adjuntar manejador de creación
  document.querySelector("#create-btn").addEventListener("click", showCreateForm);

  // TASK: Exponer función para manejo de imágenes rotas
  window.handleImageError = handleImageError;
};
