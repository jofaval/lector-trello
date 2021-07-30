/**
 * Extrae el contenido necesario del tablero y lo asocia de manera adecuada
 * 
 * @param {object} data 
 * @returns object
 */
export const parse = data => {
    const details = parseDetails(data),
    labels        = parseLabels(data),
    checklists    = parseChecklist(data),
    members       = parseMembers(data),
    membership    = parseMembership(data),
    actions       = parseActions(data, members),
    comments      = parseComments(data, actions, members),
    cards         = parseCards(data, labels, checklists, comments, members),
    lists         = parseLists(data, cards),
    bgImage       = parseBackgroundImage(data),
    bgColor       = parseBackgroundColor(data)

    return { details, labels, actions, comments, members, membership, cards, lists, bgImage, bgColor, }
};

/**
 * Extrae la imagen del tablero
 * 
 * @param {object} data 
 * @returns string
 */
const parseBackgroundImage = ({ prefs: { backgroundImage } }) => backgroundImage;

/**
 * Extrae el color de fondo del tablero
 * 
 * @param {object} data 
 * @returns string
 */
const parseBackgroundColor = ({ prefs: { backgroundColor } }) => backgroundColor;

/**
 * Extrae los detalles del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseDetails = data => {
    const { id, idMemberCreator, dateLastActivity, name, desc, url, shortUrl } = data;

    return { id, idMemberCreator, dateLastActivity, name, desc, url, shortUrl };
};

/**
 * Extrae las etiquetas del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseLabels = data => data?.labels?.map((label) => {
    const { name, color, id } = label;
    return { name, color, id }
});

/**
 * Extrae los miembros del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseMembers = ({ members }) => members;

/**
 * Extrae los roles del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseMembership = ({ memberships }) => memberships;

/**
 * Extrae las listas de tareas del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseChecklist = data => data?.checklists?.map(({ name, id, idCard, pos, checkItems }) => {
    // De cada lista de tareas se mapean sus elementos
    const mappedCheckItems = checkItems.map(checkItem => {
        const { id, name, post, state } = checkItem;

        return { id, name, post, state: state == 'complete' }
    })

    return { id, idCard, name, pos, checkItems: mappedCheckItems }
});

/**
 * Extrae las acciones del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseActions = ({ actions }, members) =>
actions.map(action => {
    const { idMemberCreator } = action;
    const member = members?.find(({ id }) => id == idMemberCreator);
    return { ...action, member }
});

/**
 * Extrae los comentarios del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseComments = (data, actions, members) => {
    // Se extraen las acciones que son comentarios
    let comments = actions?.filter(({ type }) => type == 'commentCard')

    return comments?.map?.(comment => {
        const { id, idMemberCreator, data: { text, card: { id: idCard } } } = comment;

        const member = members?.find(({ id }) => id == idMemberCreator);

        return { id, idCard, idMemberCreator, member, text };
    })
};

/**
 * Extrae las tarjetas del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseCards = (data, labels, checklists, comments, members) => data?.cards.map((card) => {
    const { attachments, cover, id, idList, desc, idLabels: cardLabels, name,
        idChecklists: cardChecklists, pos, url, shortUrl, closed, idMembers } = card;

    // Se asocian las etiquetas con las tarjetas
    const mappedLabels = cardLabels?.map(label => {
        return labels?.find(({ id }) => label == id)
    })
    // Se asocian las listas de tareas con las tarjetas
    const mappedChecklists = cardChecklists?.map(checklist => {
        if (!checklists) return checklist;

        return checklists?.find(({ id }) => checklist == id)
    })
    // Se asocian los comentarios con las tarjetas
    const mappedComments = comments?.filter(({ idCard }) => idCard == id)
    // Se asocian a los miembros con las tarjetas
    const mappedMembers = members?.filter(({ id }) => idMembers?.find((member) => member == id))

    return {
        id, name, attachments, cover, pos, url, shortUrl,
        labels: mappedLabels, checklists: mappedChecklists,
        idList, desc, comments: mappedComments, closed, members: mappedMembers
    }
});

/**
 * Extrae las listas del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseLists = (data, cards) => data?.lists?.map(list => {
    const { id } = list;
    // Se asocian las tarjetas con sus listas
    const listCards = cards?.filter(({ idList }) => idList == id)

    return { ...list, cards: listCards }
});

export default parse;