export const render = data => {
    let contentElement = document.querySelector('#content')

    const lists = renderLists(data);
    contentElement.innerHTML += lists;

    const backgroundImage = renderBackgroundImage(data)

    return lists
}

const renderBackgroundImage = data => {
    const { bgImage } = data;
    document.body.style.backgroundImage = `url("${bgImage}")`;
}

const renderLists = data => {
    return data?.lists?.map(renderList).join('')
}

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

const renderCard = card => {
    const { name } = card;
    const parsedCard = JSON.stringify(card)

    return `<div class="list-card bg-light shadow-sm rounded p-2 mt-2"
        onclick='openModal()' card="${parsedCard}" data-modal-trigger="modal-card">
        <p class="list-card-title">${name}</p>
    </div>`
}

export default render