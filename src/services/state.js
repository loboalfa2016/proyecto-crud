// ========================================
// TASK: Manejo de Estado Local
// Sistema de persistencia con localStorage
// para personajes creados y editados
// ========================================

const STORAGE_KEYS = {
  CREATED_CHARACTERS: "created_characters",
  EDITED_CHARACTERS: "edited_characters",
  CURRENT_USER: "current_user",
};

// TASK: Gestión de usuario logueado
export const getCurrentUser = () => {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

export const isLoggedIn = () => {
  return getCurrentUser() !== null;
};

// TASK: Obtener personajes creados localmente
export const getCreatedCharacters = () => {
  const data = localStorage.getItem(STORAGE_KEYS.CREATED_CHARACTERS);
  return data ? JSON.parse(data) : [];
};

// TASK: Guardar personaje creado localmente
export const addCreatedCharacter = (character) => {
  const characters = getCreatedCharacters();
  character.id = `custom_${Date.now()}`;
  character.isCustom = true;
  characters.push(character);
  localStorage.setItem(
    STORAGE_KEYS.CREATED_CHARACTERS,
    JSON.stringify(characters)
  );
  return character;
};

// TASK: Eliminar personaje creado
export const removeCreatedCharacter = (id) => {
  const characters = getCreatedCharacters();
  const filtered = characters.filter((c) => c.id !== id);
  localStorage.setItem(
    STORAGE_KEYS.CREATED_CHARACTERS,
    JSON.stringify(filtered)
  );
};

// TASK: Obtener personajes editados
export const getEditedCharacters = () => {
  const data = localStorage.getItem(STORAGE_KEYS.EDITED_CHARACTERS);
  return data ? JSON.parse(data) : {};
};

// TASK: Guardar cambios de personaje editado
export const updateEditedCharacter = (id, updates) => {
  const edited = getEditedCharacters();
  edited[id] = { ...edited[id], ...updates };
  localStorage.setItem(
    STORAGE_KEYS.EDITED_CHARACTERS,
    JSON.stringify(edited)
  );
};

// TASK: Obtener datos completos de un personaje (API + ediciones locales)
export const getMergedCharacter = (apiCharacter) => {
  const edited = getEditedCharacters();
  if (edited[apiCharacter.id]) {
    return { ...apiCharacter, ...edited[apiCharacter.id] };
  }
  return apiCharacter;
};

// TASK: Limpiar ediciones de un personaje eliminado
export const removeEditedCharacter = (id) => {
  const edited = getEditedCharacters();
  delete edited[id];
  localStorage.setItem(
    STORAGE_KEYS.EDITED_CHARACTERS,
    JSON.stringify(edited)
  );
};

// TASK: Distinguir personajes originales de ficticios
export const isCustomCharacter = (id) => {
  return String(id).startsWith("custom_");
};
