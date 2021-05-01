/**
 * Representa visualmente todo el contenido del tablero
 * 
 * @param {object} data 
 * @returns 
 */
export const render = data => {
    const contentElement = document.querySelector('#content')

    // Se añade el contenido mapeado de las listas a content
    const lists = renderLists(data);
    contentElement.innerHTML += lists;

    const backgroundImage = renderBackgroundImage(data)
    const details = renderDetails(data)

    return lists
}

/**
 * Representa visualmente la imagen de fondo del tablero
 * 
 * @param {object} data 
 * @returns 
 */
const renderBackgroundImage = data => {
    const { bgImage } = data;
    document.body.style.backgroundImage = `url("${bgImage}")`;
}

/**
 * Representa visualmente los detalles del tablero
 * 
 * @param {object} data 
 * @returns 
 */
const renderDetails = data => {
    const { details } = data;
    const { name, desc } = details;
    const detailsElement = document.querySelector('#details');

    document.title = `${name} | Trello`;

    detailsElement.innerHTML = `
        <h1 class="board-title p-2 text-white text-shadow font-weight-bold">${name}</h1>
    `
}

/**
 * Representa visualmente las listas del tablero
 * 
 * @param {object} data 
 * @returns 
 */
const renderLists = data => {
    return data?.lists?.map(renderList).join('')
}

/**
 * Representa visualmente una lista del tablero
 * 
 * @param {object} data 
 * @returns 
 */
const renderList = list => {
    const { name } = list;
    const cards = list?.cards?.map(renderCard).join('')

    return `<div class="list-container m-1">
        <div class="list shadow-sm border rounded p-2">
            <p class="list-title">${name}</p>
            <div class="list-items">
                ${cards}
            </div>
        </div>
    </div>`
}

/**
 * Representa visualmente las tarjetas del tablero
 * 
 * @param {object} data 
 * @returns 
 */
const renderCard = card => {
    // console.log('card JSON', card);

    const { name } = card;

    const parsedCard = JSON.stringify( // Convierte a string
        JSON.stringify(card) // Convierte a objeto JSON
    )
    // console.log('card JSON string', parsedCard);

    const labels = renderLabels(card)

    return `<div class="list-card bg-light shadow-sm rounded p-2 mt-2"
        onclick='openModal(this)' card='${parsedCard}' data-modal-trigger="modal-card">
        ${labels}
        <p class="list-card-title">${name}</p>
    </div>`
}

export const renderLabels = ({ labels }) => {
    const mappedLabels = labels?.map(renderLabel)?.join('')

    return `<div class="labels">${mappedLabels}</div>`;
}

const renderLabel = ({ name, color }) => `<span class="badge label ${color}">${name}</span>`

export default render