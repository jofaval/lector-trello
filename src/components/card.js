import renderLabels from "./label.js";

/**
 * Representa visualmente las tarjetas del tablero
 * 
 * @param {object} data 
 * @returns 
 */
export const renderCard = card => {
    // console.log('card JSON', card);

    const { id, name } = card;

    const parsedCard = JSON.stringify( // Convierte a string
        JSON.stringify(card) // Convierte a objeto JSON
    )
    // console.log('card JSON string', parsedCard);

    const labels = renderLabels(card)

    return `<div class="list-card bg-light shadow-sm rounded p-2 mt-2" id="${id}"
        onclick='openModal(this)' card='${parsedCard}' data-modal-trigger="modal-card">
        ${labels}
        <p class="list-card-title">${name}</p>
    </div>`
}

export default renderCard