export const parse = data => {
    const details = parseDetails(data)
    const labels = parseLabels(data)
    const checklists = parseChecklist(data)
    const cards = parseCards(data, labels, checklists)

    return {
        'details': details,
        'labels': labels,
        'cards': cards,
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

const parseCards = (data, labels, checklists) => {
    return data?.cards.map((card) => {
        const { attatchments, cover, id, idLabels: cardLabels, name,
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
            
        }
    })
}

export default parse;