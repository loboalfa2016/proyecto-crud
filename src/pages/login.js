import { navigateTo } from "../router/router";
import { setCurrentUser } from "../services/state";

// ========================================
// TASK: Página de Login
// Sistema de autenticación con roles:
// - Admin: usuario y contraseña fija
// - Usuario Normal: nombre del personaje + contraseña común
// ========================================

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";
const USER_PASSWORD = "password123";

export const loginPage = (app) => {
  app.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-blue-500 to-blue-900 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 class="text-4xl font-bold text-gray-800 mb-2 text-center">Rick and Morty</h1>
        <p class="text-gray-600 text-center mb-8">Gestión de Personajes, Episodios y Ubicaciones</p>
        
        <form id="loginForm" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-bold mb-2">Usuario</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Ej: admin o Rick"
              class="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 font-bold mb-2">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Ingresa la contraseña"
              class="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div id="errorMessage" class="text-red-500 text-sm hidden"></div>

          <button 
            type="submit" 
            class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition text-lg"
          >
            Iniciar Sesión
          </button>
        </form>

        <div class="mt-6 bg-blue-50 p-4 rounded-lg text-sm text-gray-700">
          <p class="font-bold mb-2">🔓 Acceso de Administrador:</p>
          <p>Usuario: <code class="bg-gray-200 px-2 py-1 rounded">admin</code></p>
          <p>Contraseña: <code class="bg-gray-200 px-2 py-1 rounded">admin123</code></p>
          
          <p class="font-bold mt-4 mb-2">👤 Acceso de Usuario Normal:</p>
          <p>Usuario: Nombre del personaje (Ej: Rick, Morty, Summer)</p>
          <p>Contraseña: <code class="bg-gray-200 px-2 py-1 rounded">password123</code></p>
        </div>
      </div>
    </div>
  `;

  document.querySelector("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
    const errorDiv = document.querySelector("#errorMessage");

    // Validar login de admin
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setCurrentUser({ username: "admin", role: "admin" });
      navigateTo("/characters");
      return;
    }

    // Validar login de usuario normal (búsqueda de personaje)
    if (password === USER_PASSWORD) {
      try {
        const { getCharacters } = await import("../services/api");
        
        // Buscar en múltiples páginas para encontrar el personaje
        let character = null;
        for (let page = 1; page <= 5; page++) {
          const response = await getCharacters(page);
          const allCharacters = response.results;

          // Buscar personaje por nombre completo o primer nombre
          character = allCharacters.find((c) => {
            const fullName = c.name.toLowerCase();
            const firstName = c.name.toLowerCase().split(" ")[0];
            const inputName = username.toLowerCase();
            
            return fullName === inputName || firstName === inputName;
          });

          if (character) break;
        }

        if (character) {
          setCurrentUser({ 
            username: character.name,
            role: "user",
            characterId: character.id
          });
          navigateTo("/characters");
          return;
        }
      } catch (error) {
        console.error("Error al validar usuario:", error);
      }
    }

    // Mostrar error
    errorDiv.textContent = "Usuario o contraseña incorrectos";
    errorDiv.classList.remove("hidden");
  });
};