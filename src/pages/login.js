import { navigateTo } from "../router/router";

// ========================================
// TASK: Página de Login
// Punto de entrada a la aplicación
// ========================================

export const loginPage = (app) => {
  app.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-blue-500 to-blue-900 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 class="text-4xl font-bold text-gray-800 mb-2 text-center">Rick and Morty</h1>
        <p class="text-gray-600 text-center mb-8">Gestión de Personajes, Episodios y Ubicaciones</p>
        
        <div class="bg-blue-50 p-4 rounded-lg mb-6">
          <p class="text-gray-700 text-center">Bienvenido a la Single Page Application (SPA)</p>
        </div>

        <button id="loginBtn" class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition text-lg">
          Entrar a la Aplicación
        </button>

        <div class="mt-6 text-sm text-gray-600 text-center">
          <p><strong>Funcionalidades:</strong></p>
          <ul class="text-left mt-2 space-y-1">
            <li>✓ Ver personajes de la API</li>
            <li>✓ Crear personajes personalizados</li>
            <li>✓ Editar personajes</li>
            <li>✓ Eliminar personajes</li>
            <li>✓ Ver episodios</li>
            <li>✓ Ver ubicaciones</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  // TASK: Manejar clic en botón de entrada
  document.querySelector("#loginBtn").addEventListener("click", () => {
    navigateTo("/characters");
  });
};