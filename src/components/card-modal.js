import renderLabels from "./label.js";
import renderAttachments from "./attachment.js";
import renderChecklists from "./checklist.js";
import renderComments from "./comment.js";
import renderMembers from "./member.js";

/**
 * Representa visualmente el modal de una tarjeta
 * 
 * @param {object} json 
 * @returns string
 */
export const renderCardModal = json => {
    return renderModal(json);
}

const renderCard = json => {
    const { name, desc } = json
    const labels = renderLabels(json)
    const attachments = renderAttachments(json);
    const checklists = renderChecklists(json);
    const comments = renderComments(json);

    return `
        ${labels}
        <p>${marked(desc)}</p>
        ${json?.attachments && json?.attachments.length ? attachments : attachments}
        ${checklists}
        <div class="py-3 w-100">&nbsp;</div>
        ${comments}
    `
}

const renderModal = json => {
    const { name, desc } = json

    const members = renderMembers(json);

    return `
    <div class="modal" tabindex="-1" onclick="closeCardModal()">
        <div class="modal-dialog" onclick="stopPropagation()">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${name}</h5>
                    ${members}
                    <button type="button" class="btn-close" data-bs-dismiss="modal-card" onclick="closeCardModal()" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${renderCard(json)}
                </div>
                <!-- div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal-card" onclick="closeCardModal()">Close</button>
                </div -->
            </div>
        </div>
    </div>
    `
}

export default renderCardModal;