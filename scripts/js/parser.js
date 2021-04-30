export const parse = data => {
    const labels = parseLabels(data)
    const checklists = parseChecklist(data)

    return {
        'labels': labels,
    }
};

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

export default parse;