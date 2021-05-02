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