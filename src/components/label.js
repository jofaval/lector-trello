/**
 * Renderiza visualmente una sola etiqueta
 * 
 * @param {object} label 
 * @returns string
 */
export const renderLabel = ({ name, color }) =>
`<span class="badge label ${color}">${name}</span>`;

/**
 * Renderiza visualmente todas las etiquetas
 * 
 * @param {object} data 
 * @returns string
 */
export const renderLabels = ({ labels }) =>
`<div class="labels">${labels?.map(renderLabel)?.join('')}</div>`;

export default renderLabels;