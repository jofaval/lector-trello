import { renderMember } from "./member.js";

/**
 * Renderiza una sola acción
 * 
 * @param {object} action 
 * @returns string
 */
export const renderAction = ({ id, member, type, data, date }) => {
    let actionDetail = '';

    // Si se ha encontrado texto, se usa
    if ("text" in data) {
        const { text } = data;
        actionDetail = `con el contenido "${text}"`;
    }

    // Se si ha realizado dentro de una tarjeta se indica
    let cardString = '';
    if ("card" in data) {
        const { card: { name: cardName } } = data;
        cardString = `a la tarjeta "${cardName}"`
    }
    
    // Se si ha realizado dentro de una lista se indica
    let listString = '';
    if ("list" in data) {
        const { list: { name: listName } } = data;
        listString = `en la lista "${listName}"`
    }
    
    // Se si ha realizado dentro de una lista de tareas se indica
    let checklistString = '';
    if ("checklist" in data) {
        const { checklist: { name: checklistName } } = data;
        checklistString = `en la lista de tareas "${checklistName}"`
    }
    
    // Se si ha realizado dentro de una lista de tareas se indica
    if ("checkItem" in data) {
        const { checkItem: { name: checkItemName, state } } = data;
        const checkItemString = `marcado "${checkItemName}" como "${state}"`

        if (checklistString) {
            checklistString = `${checkItemString} ${checklistString}`;
        } else {
            checklistString = checkItemString;
        }
    }

    const finalString = `Se ha ${type} ${actionDetail} ${cardString} ${listString} ${checklistString} el ${date}`

    return `<div class="action d-flex m-2 p-3" id="${id}">
        <div class="action-creator">
            ${renderMember(member)}
        </div>
        <span class="action-detial">${finalString}</span>
    </div>`
}

/**
 * Renderiza todas las acciones
 * 
 * @param {object} data 
 * @returns string
 */
export const renderActions = ({ actions }) =>
`<div class="actions">${actions?.map(renderAction).join('')}</div>`

export default renderActions;