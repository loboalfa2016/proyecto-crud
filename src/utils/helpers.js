// ========================================
// TASK: Funciones Auxiliares
// Utilidades para manejo de errores,
// confirmaciones y feedback
// ========================================

// TASK: Mostrar mensaje de éxito
export const showSuccess = (message) => {
  const notification = document.createElement("div");
  notification.className =
    "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
};

// TASK: Mostrar mensaje de error
export const showError = (message) => {
  const notification = document.createElement("div");
  notification.className =
    "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
};

// TASK: Confirmación antes de eliminar
export const confirmDelete = () => {
  return confirm("¿Está seguro de que desea eliminar este personaje?");
};

// TASK: Manejar imagen rota
export const handleImageError = (event) => {
  event.target.src =
    "https://via.placeholder.com/300x400?text=Imagen+no+disponible";
};

// TASK: Validar formulario de personaje
export const validateCharacterForm = (formData) => {
  const errors = [];

  if (!formData.name || formData.name.trim() === "") {
    errors.push("El nombre es obligatorio");
  }

  if (!formData.species || formData.species.trim() === "") {
    errors.push("La especie es obligatoria");
  }

  if (!formData.gender || formData.gender.trim() === "") {
    errors.push("El género es obligatorio");
  }

  if (!formData.status || formData.status.trim() === "") {
    errors.push("El estado es obligatorio");
  }

  if (!formData.image || formData.image.trim() === "") {
    errors.push("La URL de la imagen es obligatoria");
  }

  return errors;
};

// TASK: Validar URL de imagen
export const isValidImageUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// TASK: Extraer ID de una URL
export const extractIdFromUrl = (url) => {
  return url.split("/").pop();
};
