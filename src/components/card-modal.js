/**
 * Representa visualmente el modal de una tarjeta
 * 
 * @param {object} json 
 * @returns string
 */
const renderCardModal = json => {
    return renderModal(json);
}

const renderLabels = ({ labels }) => {
    const mappedLabels = labels?.map(renderLabel)?.join('')

    return `<div class="labels">${mappedLabels}</div>`;
}

const renderLabel = ({ name, color }) => `<span class="badge label ${color}">${name}</span>`

const renderModal = json => {
    const { name, desc } = json

    const labels = renderLabels(json)

    return `
    <div class="modal" tabindex="-1" onclick="closeCardModal()">
        <div class="modal-dialog" onclick="stopPropagation()">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal-card" onclick="closeCardModal()" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${labels}
                    <p>${marked(desc)}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal-card" onclick="closeCardModal()">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
  
    `
}