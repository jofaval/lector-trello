/**
 * Renderiza en un modal el contenido de la tarjeta, y abre dicho modal
 * 
 * @param {HTMLElement} div 
 * @returns void
 */
let openModal = function (div) {
    const rawJson = div.getAttribute('card');
    // console.log('rawJson', rawJson);

    let json = JSON.parse(
        JSON.parse(rawJson)
    );

    console.log('se ha abierto una tarjeta', json);

    const modalCard = document.querySelector('#modal-card');
    console.log('modalCard', modalCard);
    // Se renderiza el modal de la carta
    modalCard.innerHTML = cardModal(json);

    // Se muestra visible el contenedor
    modalCard?.classList?.remove('d-none')
    modalCard?.classList?.add('d-block')
    
    // Se muestra visible el modal
    const modal = modalCard?.querySelector('.modal')
    console.log('modal', modal);
    modal?.classList?.remove('d-none')
    modal?.classList?.add('d-block')

}

/**
 * Cierra el modal de la tarjeta
 * 
 * @returns void
 */
let closeCardModal = function () {
    const modal = document.querySelector('.modal')

    modal.remove();
}

/**
 * Termina la propagación de los eventos
 * 
 * @returns void
 */
let stopPropagation = function (evt) {
    const event = evt || window.event;

    event.preventDefault();
    event.stopPropagation();

    return false;
}

/**
 * Oculta o muestra el sidebar con todas las acciones
 * 
 * @param {event} evt 
 * @returns void
 */
let toggleSidebar = evt => {
    // Se coge el evento de verdad por si se necesita
    const event = evt || window.event;

    // Se recupera el botón de la acción
    const btnSidebar = document.querySelector('#btnSidebar');

    // Se recupera el body
    const body = document.body;
    
    // Hace el tooggle del .show-sidebar
    body.classList.toggle('show-sidebar');
}

/**
 * Lee el contenido de un fichero
 * 
 * @param {*} file El fichero a leer
 * @param {event} onLoad El evento para cuando se haya terminado de leer
 * 
 * @returns {void}
 */
 const readFile = (file, onLoad) => {
    const reader = new FileReader();

    console.log('Leyendo fichero');

    reader.addEventListener('load', (event) => {
        const result = event.target.result;
        console.log('Fichero leído, contenido:', result);
        // Do something with result

        if (onLoad) onLoad(result);
    });

    reader.addEventListener('progress', (event) => {
        if (event.loaded && event.total) {
            const percent = (event.loaded / event.total) * 100;
            console.log(`Progress: ${Math.round(percent)}`);
        }
    });

    reader.readAsDataURL(file);
};

/**
 * Se ejecuta cuando se ha terminado de leer el contenido de un fichero
 * 
 * @param {JSON} result El contenido del fichero
 * 
 * @returns {void}
 */
const onFileRead = (result) => {
    result = result.split(',')[1];
    const parsedJSON = JSON.parse( atob(result) );
    console.log('contenido parseado', parsedJSON);

    init(null, parsedJSON);
};

/**
 * Detecta que se ha subido un nuevo fichero y lo intenta procesar
 * 
 * @returns {void}
 */
let filechange = () => {
    const fileList = event.target.files;
    console.log(fileList, fileList);
    const file = fileList[0];

    console.log('Fichero subido');
    readFile(file, onFileRead);
    // alert($(this).val());
};