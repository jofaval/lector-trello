import { renderMember } from "./member.js";

/**
 * Renderiza visualmente una sola acción
 * 
 * @param {object} action 
 * @returns string
 */
export const renderAction = ({ id, member, type, data, date }) => {
    let actionDetail = '';

    // Si se ha encontrado texto, se usa
    if ("text" in data) {
        const { text } = data;
        actionDetail = `con el contenido <div class="card w-100 p-3">${marked(text.replaceAll('\n', '<br />'))}</div>`;
    }

    // Se si ha realizado dentro de una tarjeta se indica
    let cardString = '';
    if ("card" in data) {
        const { card: { name: cardName } } = data;
        cardString = `a la tarjeta <span class="badge bg-light border text-dark" style="font-size: small;">${cardName}</span>`
    }
    
    // Se si ha realizado dentro de una lista se indica
    let listString = '';
    if ("list" in data) {
        const { list: { name: listName } } = data;
        listString = `en la lista <span class="badge bg-light border text-dark" style="font-size: small;">${listName}</span>`
    }
    
    // Se si ha realizado dentro de una lista de tareas se indica
    let checklistString = '';
    if ("checklist" in data) {
        const { checklist: { name: checklistName } } = data;
        checklistString = `en la lista de tareas <span class="badge bg-light border text-dark" style="font-size: small;">${checklistName}</span>`
    }
    
    // Se si ha realizado dentro de una lista de tareas se indica
    if ("checkItem" in data) {
        const { checkItem: { name: checkItemName, state } } = data;
        const checkItemString = `marcado <span class="badge bg-light border text-dark" style="font-size: small;">${checkItemName}</span> como <span class="badge bg-light border text-dark" style="font-size: small;">${state}</span>`

        if (checklistString) {
            checklistString = `${checkItemString} ${checklistString}`;
        } else {
            checklistString = checkItemString;
        }
    }

    const finalString = `Se ha <span class="font-weight-bold">${type}</span> ${actionDetail} ${cardString} ${listString} ${checklistString}`

    return `<div class="action d-flex m-2 p-3" id="${id}">
        <div class="action-creator">
            ${renderMember(member)}
        </div>
        <span class="action-detial">
            <i class="action-detail-date">${date}</i>
            <br />
            <span class="action-detail-content">${finalString}</span>
        </span>
    </div>`
};

/**
 * Renderiza visualmente todas las acciones
 * 
 * @param {object} data 
 * @returns string
 */
export const renderActions = ({ actions }) =>
`<div class="actions">${actions?.map(renderAction).join('')}</div>`;

export default renderActions;