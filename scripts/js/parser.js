export const parse = data => {
    const details = parseDetails(data)
    const labels = parseLabels(data)
    const checklists = parseChecklist(data)
    const actions = parseActions(data)
    const comments = parseComments(data, actions)
    const cards = parseCards(data, labels, checklists)
    const lists = parseLists(data, cards)

    return {
        'details': details,
        'labels': labels,
        'actions': actions,
        'comments': comments,
        'cards': cards,
        'lists': lists,
    }
};

const parseDetails = data => {
    const { id, dateLastActivity, name, desc, url, shortUrl } = data;

    return { id, dateLastActivity, name, desc, url, shortUrl };
}

const parseLabels = data => {
    return data?.labels?.map((label) => {
        const { name, color, id } = label;
        return { name, color, id }
    })
}

const parseChecklist = data => {
    return data?.checklists?.map((checklist) => {
        const { name, id, idCard, pos, checkItems } = checklist

        const mappedCheckItems = checkItems.map(checkItem => {
            const { id, name, post, state } = checkItem;

            return { id, name, post, state: state == 'complete' }
        })

        return { id, idCard, name, pos, checkItems: mappedCheckItems }
    })
}

const parseActions = data => {
    return data?.actions?.map(action => action)
}

const parseComments = (data, actions) => {
    let comments = actions?.filter(({ type }) => type == 'commentCard')

    return comments?.map?.(comment => {
        const { id, idMemberCreator, data: { text, card: { id: idCard } } } = comment;

        return { id, idCard, idMemberCreator, text };
    })
}

const parseCards = (data, labels, checklists) => {
    return data?.cards.map((card) => {
        const { attatchments, cover, id, idList, idLabels: cardLabels, name,
            idChecklists: cardChecklists, pos, url, shortUrl } = card;

        const mappedLabels = cardLabels?.map(label => {
            return labels?.find(({ id }) => label == id)
        })
        const mappedChecklists = cardChecklists?.map(checklist => {
            if (!checklists) return checklist;

            return checklists?.find(({ id }) => checklist == id)
        })

        return {
            id, name, attatchments, cover, pos, url, shortUrl,
            labels: mappedLabels, checklists: mappedChecklists,
            idList,
        }
    })
}

const parseLists = (data, cards) => {
    return data?.lists?.map(list => {
        const { id } = list;
        const listCards = cards?.filter(({ idList }) => idList == id)

        return { ...list, cards: listCards }
    })
}

export default parse;