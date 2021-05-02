import renderCard from "./card.js"

/**
 * Representa visualmente una lista del tablero
 * 
 * @param {object} list 
 * @returns stirng
 */
 export const renderList = ({ name, cards: listCards, id }) => {
    const cards = listCards?.filter(({ closed }) => !closed)?.map(renderCard).join('')

    return `<div class="list-container m-1">
        <div class="list shadow-sm border rounded p-2" id="${id}">
            <p class="list-title">${name}</p>
            <div class="list-items">
                ${cards}
            </div>
        </div>
    </div>`
}

/**
 * Representa visualmente las listas del tablero
 * 
 * @param {object} data 
 * @returns stirng
 */
 export const renderLists = ({ lists }) => {
    return lists?.filter(({ closed }) => !closed)?.map(renderList).join('')
}

export default renderLists