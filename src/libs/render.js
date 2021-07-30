import renderActions from "../components/action.js";
import renderBtnSidebar from "../components/button/btnSidebar.js";
import renderLabels from "../components/label.js";
import renderLists from "../components/list.js";
import renderMembers from "../components/member.js";

/**
 * Representa visualmente todo el contenido del tablero
 * 
 * @param {object} data 
 * @returns 
 */
export const render = data => {
    const contentElement = document.querySelector('#content')

    const details = renderDetails(data)
    const background = renderBackground(data)

    // Se añade el contenido mapeado de las listas a content
    const lists = renderLists(data);
    contentElement.innerHTML = lists;

    // Se renderizan las acciones en el sidebar
    renderSidebar(data);

    return lists
};

/**
 * Representa visualmente la imagen de fondo del tablero
 * 
 * @param {object} data 
 * @returns 
 */
const renderBackground = ({ bgImage, bgColor }) => {
    const element = document.querySelector('html')

    document.body.style.background = 'transparent';
    element.style.backgroundImage = `url("${bgImage}")`;
    // document.body.style.backgroundImage = `url("${bgImage}")`;

    element.style.backgroundColor = `${bgColor}`;
    document.body.style.backgroundColor = `${bgColor}`;
};

/**
 * Representa visualmente los detalles del tablero
 * 
 * @param {object} data 
 * @returns 
 */
const renderDetails = ({ details: { name, desc }, members, labels }) => {
    const detailsElement = document.querySelector('#details');

    document.title = `${name} | Trello`;

    detailsElement.innerHTML = `
        <h1 class="board-title d-inline-block p-2 text-white text-shadow font-weight-bold">${name}</h1>
        ${renderMembers({ members })}
        ${renderBtnSidebar()}
        ${renderLabels({ labels })}
    `
};

const renderSidebar = data => {
    const sidebar = document.querySelector('#sidebar');

    const actions = renderActions(data);
    sidebar.innerHTML = `${actions}`

    return actions;
};

export default render;