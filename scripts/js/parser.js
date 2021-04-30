export const parse = data => {
    const labels = parseLabels(data)

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

export default parse;