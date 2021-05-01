export const renderLabel = ({ name, color }) =>
`<span class="badge label ${color}">${name}</span>`

export const renderLabels = ({ labels }) =>
`<div class="labels">${labels?.map(renderLabel)?.join('')}</div>`

export default renderLabels