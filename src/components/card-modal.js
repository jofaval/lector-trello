/**
 * Representa visualmente el modal de una tarjeta
 * 
 * @param {object} json 
 * @returns string
 */
const renderCardModal = json => {
    return renderModal(json);
}

const renderModal = json => {
    const { name, desc } = json

    return `
    <div class="modal" tabindex="-1" onclick="closeCardModal()">
        <div class="modal-dialog" onclick="stopPropagation()">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal-card" onclick="closeCardModal()" aria-label="Close"></button>
                </div>
                <div class="modal-body">
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