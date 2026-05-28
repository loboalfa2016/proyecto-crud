# Actividad SPA

## Cada grupo debe entregar:

### 1. Código fuente funcional El proyecto debe ejecutarse correctamente y ser enviado por correo a `abrahan.villa@riwi.io` adjuntando la URL del repositorio.

### 2. Diagrama de flujo Debe representar:

    - Navegación SPA
    - Renderizado
    - Flujo CRUD
    - Interacción usuario → DOM → datos

Puede realizarse en:

    - Draw.io
    - Miro
    - Lucidchart
    - Excalidraw

### 3. Sustentación técnica
   
   Duración máxima: `10 minutos`

   Fecha: `Viernes 29 de mayo — 5:00 PM`
   
   **Durante la sustentación TODOS los integrantes deben participar.
   Funcionalidades Obligatorias**


### 4. Parte 1 — Nuevas páginas SPA

   la aplicación necesita renderizar información básica de personajes.
   
   El cliente solicita ampliar el sistema creando nuevas páginas dinámicas dentro de la SPA.
   
   **Requerimiento 1** — Página de Episodios
   
   Crear una nueva vista SPA que permita visualizar episodios.
   
   Debe mostrar:

   - Nombre del episodio
   - Fecha de emisión
   - Cantidad de personajes participantes
   
   
   **Requerimiento 2** — Página de Ubicaciones

   Crear una nueva vista SPA para visualizar locations.

   Debe mostrar:

   - Nombre
   - Tipo
   - Dimensión
   - Cantidad de residentes

   
   **Requerimiento 3** — Navegación SPA
   
   La navegación NO debe recargar la página.
   
   Deben integrar correctamente:

   - Rutas
   - Renderizado dinámico
   - Navegación activa
   - Control de vistas

### 5. Parte 2 — CRUD de Personajes

   El cliente desea permitir operaciones dinámicas sobre personajes.

   Estas operaciones NO modificarán realmente la API pública.

   Las modificaciones deben mantenerse en memoria local o localStorage.

      
   **Requerimiento 4** — Eliminar personaje

   El usuario debe poder eliminar personajes renderizados del DOM.
   Condiciones:
   
   - La eliminación debe ser visual inmediata
   - No debe recargar la página
   - el DOM debe actualizarse dinámicamente
   - Debe existir confirmación antes de eliminar
   
   **Requerimiento 5** — Crear personaje ficticio

   El usuario podrá crear un personaje personalizado.
   Debe existir un formulario SPA que permita ingresar:

   - Nombre
   - Especie
   - Género
   - Estado
   - URL de imagen
   
   **Condiciones técnicas**
   
   El nuevo personaje debe:
   
   - Renderizarse dinámicamente
   - Coexistir con personajes de la API
   - Persistirse localmente
   - Mostrarse inmediatamente sin recargar
   
   **Requerimiento 6** — Editar personaje

   Debe existir la posibilidad de modificar personajes ya renderizados.
   El usuario debe poder editar:

   - Nombre
   - Especie
   - Estado

   Restricción importante
   
   No deben modificar directamente la información proveniente de la API.
   Deben pensar cómo:

   - Mantener integridad de datos
   - Sobrescribir visualmente
   - Manejar estado local
   - Sincronizar renderizado
   
   **Requerimiento 7** — Manejo de errores

   La aplicación debe manejar:

   - Imágenes rotas
   - Respuestas vacías
   - Errores API
   - Formularios incompletos
   
   **Requerimiento 8** — Confirmaciones y feedback

   La aplicación debe informar al usuario:

   - Errores presentados
   - Eliminación realizada
   - Edición realizada
   - Creación exitosa
   
   Pensamiento Arquitectónico
   
   Antes de escribir código, cada equipo debe analizar:
   
   **Pregunta 1**

   ¿Cómo manejarán el estado de personajes creados localmente?

   **Pregunta 2**

   ¿Cómo diferenciarán personajes originales de personajes ficticios?

   **Pregunta 3**

   ¿Cómo sincronizarán?

   - API
   - DOM
   - localStorage
   - renderizado SPA?

   **Pregunta 4**
   
   ¿Cómo evitarán duplicación de lógica?
   
   **Pregunta 5**
   
   ¿Qué componentes pueden reutilizarse?
   
   Requisitos Técnicos Esperados
   
   El taller busca:
   - Manipulación DOM
   - Arquitectura SPA
   - Modularidad
   - Routing
   - Asincronismo
   - Renderizado dinámico
   - Manejo de estado
   - Persistencia local
   - Eventos
   - Desacoplamiento
   - Reutilización
   - Debugging
   
   Recomendación Final
   
   NO comiencen programando.
   
   Primero:

    - Entiendan el proyecto
    - Analicen el flujo SPA
    - Definan responsabilidades
    - Diseñen el flujo
    - Organicen módulos
    - Definan estrategia CRUD
    - Piensen cómo sincronizar estado y renderizado

   Luego sí comiencen la implementación.
   La calidad de la solución será más importante que la cantidad de código escrito.
