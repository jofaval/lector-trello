# Lector de Trello
Tiene como objetivo poder visualizar el tablero de **Trello** a través de un archivo JSON

*Por comidad que primero lea el archivo de local, más adelante podría leerlo de un selector de ficheros*

Para crear un tablero dirígete a [Trello](https://trello.com)

## Objetivos
 - Poder asociar de manera adecuada y cómoda el JSON exportado de cualquier tablero de Trello.
 - Generar la vista del tablero con cierta interacción de usuario.
 - Permitir la visualización de tableros en una fecha en concreto.
 - Poder exportar un tablero y crear otros dentro del plan gratuito si perder acceso a la información.

### Parsear
Detalles del tablero *(título, descripción, etc.)*, Las etiquetas, Listas de tareas, Acciones de los miembros, Comentarios de las tarjetas, Miembros, Roles de miembros, Listas, Tarjetas, Imagen de fondo

### Renderizar
Detalles del tablero, Las etiquetas, Listas de tareas, Acciones de los miembros, Comentarios de las tarjetas, Miembros, Roles de miembros, Listas, Tarjetas, Imagen de fondo, Archivos adjuntos

## Asistencia
### ¿Cómo funciona?
 - Se ha de crear a nivel raíz un fichero *config.js*
 - Dichero fichero contendrá la ruta al /data/trello.json

*Contenido del fichero *config.js*:*

    export const filename = '/data/fichero-trello.json'

    console.log('filename', filename);

    // En caso de querer configurar la apertura inmediata de una tarjeta
    document.querySelectorAll('.list-card')[num_tarjeta].click()

    export default filename;