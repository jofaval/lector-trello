/**
 * Extrae el contenido necesario del tablero y lo asocia de manera adecuada
 * 
 * @param {object} data 
 * @returns object
 */
export const parse = data => {
    const details = parseDetails(data)
    const labels = parseLabels(data)
    const checklists = parseChecklist(data)
    const actions = parseActions(data)
    const comments = parseComments(data, actions)
    const members = parseMembers(data)
    const membership = parseMembership(data)
    const cards = parseCards(data, labels, checklists, comments)
    const lists = parseLists(data, cards)
    const bgImage = parseBackgroundImage(data)
    const bgColor = parseBackgroundColor(data)

    return {
        'details': details,
        'labels': labels,
        'actions': actions,
        'comments': comments,
        'members': members,
        'membership': membership,
        'cards': cards,
        'lists': lists,
        'bgImage': bgImage,
        'bgColor': bgColor,
    }
};

/**
 * Extrae la imagen del tablero
 * 
 * @param {object} data 
 * @returns string
 */
const parseBackgroundImage = data => {
    return data?.prefs?.backgroundImage
}

/**
 * Extrae el color de fondo del tablero
 * 
 * @param {object} data 
 * @returns string
 */
const parseBackgroundColor = data => {
    return data?.prefs?.backgroundColor
}

/**
 * Extrae los detalles del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseDetails = data => {
    const { id, idMemberCreator, dateLastActivity, name, desc, url, shortUrl } = data;

    return { id, idMemberCreator, dateLastActivity, name, desc, url, shortUrl };
}

/**
 * Extrae las etiquetas del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseLabels = data => {
    return data?.labels?.map((label) => {
        const { name, color, id } = label;
        return { name, color, id }
    })
}

/**
 * Extrae los miembros del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseMembers = data => {
    return data?.members?.map(member => member)
}

/**
 * Extrae los roles del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseMembership = data => {
    return data?.memberships?.map(membership => membership)
}

/**
 * Extrae las listas de tareas del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseChecklist = data => {
    return data?.checklists?.map((checklist) => {
        const { name, id, idCard, pos, checkItems } = checklist

        // De cada lista de tareas se mapean sus elementos
        const mappedCheckItems = checkItems.map(checkItem => {
            const { id, name, post, state } = checkItem;

            return { id, name, post, state: state == 'complete' }
        })

        return { id, idCard, name, pos, checkItems: mappedCheckItems }
    })
}

/**
 * Extrae las acciones del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseActions = data => {
    return data?.actions?.map(action => action)
}

/**
 * Extrae los comentarios del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseComments = (data, actions) => {
    // Se extraen las acciones que son comentarios
    let comments = actions?.filter(({ type }) => type == 'commentCard')

    return comments?.map?.(comment => {
        const { id, idMemberCreator, data: { text, card: { id: idCard } } } = comment;

        return { id, idCard, idMemberCreator, text };
    })
}

/**
 * Extrae las tarjetas del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseCards = (data, labels, checklists, comments) => {
    return data?.cards.map((card) => {
        const { attachments, cover, id, idList, desc, idLabels: cardLabels, name,
            idChecklists: cardChecklists, pos, url, shortUrl } = card;

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

        return {
            id, name, attachments, cover, pos, url, shortUrl,
            labels: mappedLabels, checklists: mappedChecklists,
            idList, desc, comments: mappedComments
        }
    })
}

/**
 * Extrae las listas del tablero
 * 
 * @param {object} data 
 * @returns object
 */
const parseLists = (data, cards) => {
    return data?.lists?.map(list => {
        const { id } = list;
        // Se asocian las tarjetas con sus listas
        const listCards = cards?.filter(({ idList }) => idList == id)

        return { ...list, cards: listCards }
    })
}

export default parse;