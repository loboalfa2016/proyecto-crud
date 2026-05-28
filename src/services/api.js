import axios from "axios";

const API_BASE_URL = "https://rickandmortyapi.com/api";

// ========================================
// TASK: Servicios de API
// Configurar cliente HTTP para consumir
// la API de Rick and Morty
// ========================================

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// TASK: Obtener personajes
export const getCharacters = async (page = 1) => {
  try {
    const response = await api.get(`/character?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw new Error("No se pudieron cargar los personajes");
  }
};

// TASK: Obtener un personaje por ID
export const getCharacterById = async (id) => {
  try {
    const response = await api.get(`/character/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching character:", error);
    throw new Error(`No se pudo cargar el personaje ${id}`);
  }
};

// TASK: Obtener episodios
export const getEpisodes = async (page = 1) => {
  try {
    const response = await api.get(`/episode?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    throw new Error("No se pudieron cargar los episodios");
  }
};

// TASK: Obtener un episodio por ID
export const getEpisodeById = async (id) => {
  try {
    const response = await api.get(`/episode/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching episode:", error);
    throw new Error(`No se pudo cargar el episodio ${id}`);
  }
};

// TASK: Obtener locaciones
export const getLocations = async (page = 1) => {
  try {
    const response = await api.get(`/location?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw new Error("No se pudieron cargar las ubicaciones");
  }
};

// TASK: Obtener una locación por ID
export const getLocationById = async (id) => {
  try {
    const response = await api.get(`/location/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching location:", error);
    throw new Error(`No se pudo cargar la ubicación ${id}`);
  }
};

// TASK: Obtener múltiples episodios
export const getEpisodesByIds = async (ids) => {
  try {
    const response = await api.get(`/episode/${ids.join(",")}`);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return [];
  }
};

// TASK: Obtener múltiples personajes
export const getCharactersByIds = async (ids) => {
  try {
    const response = await api.get(`/character/${ids.join(",")}`);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};
