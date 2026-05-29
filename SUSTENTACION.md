# 🎤 Guía de Sustentación - Distribución por Persona

## 👥 División de Presentación - 3 Personas

### 📍 **PERSONA 1: Autenticación y Rutas SPA**
**Archivos**: `main.js`, `router.js`, `login.js`

**Qué explicar:**
1. ¿Cómo inicia la aplicación? (main.js)
   - `DOMContentLoaded` → inicializa navbar
   - Llama a `router()` para cargar la página correcta

2. ¿Cómo funciona el routing SPA? (router.js)
   - Mapeo de rutas (`/`, `/characters`, `/episodes`, `/locations`)
   - Protección de rutas: valida si está logueado
   - `navigateTo()` cambia URL sin recargar página
   - `history.pushState()` + `popstate` event

3. ¿Cómo funciona el login? (login.js)
   - Dos tipos de usuario: Admin (admin/admin123) y Usuario (nombre personaje/password123)
   - Valida credenciales
   - Guarda usuario en `localStorage`
   - Redirige a `/characters`

**Código clave a mostrar:**
```javascript
// router.js
export const router = async () => {
  if (protectedRoutes.includes(path) && !isLoggedIn()) {
    history.pushState({}, "", "/");
    router();
    return;
  }
  await page(app); // Renderiza la página
};
```

---

### 📊 **PERSONA 2: Gestión de Datos y Estado**
**Archivos**: `api.js`, `state.js`, `helpers.js`

**Qué explicar:**
1. ¿Cómo se consumen datos de la API? (api.js)
   - Axios con baseURL a Rick and Morty API
   - Funciones para: `getCharacters()`, `getEpisodes()`, `getLocations()`
   - Try/catch para manejo de errores

2. ¿Cómo se guarda estado local? (state.js)
   - 3 tipos de datos en `localStorage`:
     - `current_user`: Usuario logueado
     - `created_characters`: Personajes creados localmente
     - `edited_characters`: Cambios a personajes de API
   - Funciones CRUD: `addCreatedCharacter()`, `updateEditedCharacter()`, `removeCreatedCharacter()`
   - `getMergedCharacter()`: Combina datos de API + ediciones locales

3. ¿Cómo se validan datos? (helpers.js)
   - `showSuccess()` / `showError()`: Notificaciones
   - `confirmDelete()`: Diálogo de confirmación
   - `validateCharacterForm()`: Validación de campos

**Código clave a mostrar:**
```javascript
// state.js - Fusión de datos
export const getMergedCharacter = (apiCharacter) => {
  const edited = getEditedCharacters();
  if (edited[apiCharacter.id]) {
    return { ...apiCharacter, ...edited[apiCharacter.id] };
  }
  return apiCharacter;
};
```

---

### 🎨 **PERSONA 3: Interfaz y Operaciones CRUD**
**Archivos**: `characters.js`, `episodes.js`, `locations.js`

**Qué explicar:**
1. ¿Cómo se renderiza la página de personajes? (characters.js)
   - Obtiene datos de API + localStorage + ediciones
   - Filtra según rol de usuario (Admin ve todo, Usuario solo su personaje)
   - Crea tarjetas HTML con imagen, nombre, especie, etc.

2. ¿Cómo funciona la creación de personajes? (CREATE)
   - Modal con formulario
   - Valida nombre, especie, género, estado
   - `addCreatedCharacter()` en localStorage
   - Refresca la vista

3. ¿Cómo funciona la edición? (UPDATE)
   - Modal pre-llenado con datos actuales
   - `updateEditedCharacter()` guarda cambios
   - Se mantiene ID original (no crea copia)

4. ¿Cómo funciona la eliminación? (DELETE)
   - Confirmación con `confirmDelete()`
   - Si es custom: `removeCreatedCharacter()`
   - Si es de API: `removeEditedCharacter()`

5. Páginas de solo lectura (episodesPage, locationsPage)
   - Obtienen datos de API
   - Renderizaran sin botones de edición
   - Paginación integrada

**Código clave a mostrar:**
```javascript
// characters.js - Flujo CRUD
const handleDeleteCharacter = (id) => {
  if (!confirmDelete()) return;

  if (isCustomCharacter(id)) {
    removeCreatedCharacter(id);
  } else {
    removeEditedCharacter(id);
  }

  showSuccess("Personaje eliminado correctamente");
  renderCharacters();
};
```

---

## 🎤 Sugerencias para la Sustentación

### ⏱️ Cronograma (10 minutos total)

**PERSONA 1 - 4 minutos:**
- Mostrar cómo la app inicia (abrir en navegador, mostrar DevTools)
- Explicar flujo de login (intentar login válido e inválido)
- Demostrar cambio de rutas sin recargar (click en Personajes, Episodios, Ubicaciones)
- Mostrar código en editor: `main.js`, `router.js`, `login.js`

**PERSONA 2 - 3 minutos:**
- Mostrar en DevTools: Network tab (llamadas API a Rick and Morty)
- Mostrar Storage tab (localStorage con usuario, personajes creados, ediciones)
- Explicar cómo se mezclan datos de API con ediciones locales
- Mostrar código: `api.js`, `state.js`, `getMergedCharacter()`

**PERSONA 3 - 3 minutos:**
- Hacer demo del CRUD completo:
  - **CREATE**: Botón "Crear" → llenar formulario → guardar → aparece en lista
  - **READ**: Mostrar personajes de API y creados juntos
  - **UPDATE**: Editar nombre/especie de un personaje → cambios se guardan
  - **DELETE**: Eliminar personaje → confirmación → desaparece de la lista
- Recargar página con F5 → datos persisten en localStorage
- Mostrar código: `characters.js`, funciones de CRUD

---

## 💡 Preguntas Posibles de Evaluadores

### Para PERSONA 1:
- ¿Por qué no recarga la página al cambiar de ruta?
  → Usamos `history.pushState()` en lugar de recargar

- ¿Cómo proteges las rutas?
  → Verificamos `isLoggedIn()` antes de renderizar

- ¿Qué pasa si alguien intenta entrar a `/characters` sin estar logueado?
  → Lo redirigimos a `/` (página de login)

### Para PERSONA 2:
- ¿Por qué usas localStorage en lugar de una base de datos?
  → Es una SPA sin backend, todo es cliente-side

- ¿Cómo diferencias datos de API vs datos creados localmente?
  → IDs custom_ = creados localmente, números = API

- ¿Qué pasa si editas un personaje de API? ¿Modifica la API?
  → No, guardamos cambios en localStorage bajo `edited_characters`

### Para PERSONA 3:
- ¿Cómo validas los formularios?
  → `validateCharacterForm()` en helpers.js

- ¿Qué diferencia hay entre eliminar un custom vs un personaje de API?
  → Custom se elimina completamente, API se marca como eliminado en localStorage

- ¿Cómo hace admin para ver todos los personajes y un usuario solo el suyo?
  → Filtramos en `renderCharacters()` según `currentUser.role`

---

## 📋 Checklist Antes de Presentar

- [ ] App funciona: npm run dev
- [ ] Se puede loguear con admin/admin123
- [ ] Se puede loguear con nombre de personaje/password123
- [ ] Crear personaje funciona
- [ ] Editar personaje funciona
- [ ] Eliminar personaje funciona con confirmación
- [ ] Los datos persisten al recargar
- [ ] Las rutas no recarga la página
- [ ] DevTools abierto para mostrar Network y Storage
- [ ] Código preparado para mostrar
- [ ] Cada persona conoce su parte

---

## 📊 Diagrama de Flujo (para referencia)

Ver `IMPLEMENTACION.md` - Sección "Diagrama de Flujo del Programa"

---

**Fecha**: 29 de mayo de 2026
**Duración Máxima**: 10 minutos
**Todos deben participar** ✅
