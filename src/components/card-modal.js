import renderMembers, { renderMember } from "./member.js";

/**
 * Representa visualmente el modal de una tarjeta
 * 
 * @param {object} json 
 * @returns string
 */
export const renderCardModal = json => {
    return renderModal(json);
}

const renderLabels = ({ labels }) => {
    const mappedLabels = labels?.map(renderLabel)?.join('')

    return `<div class="labels">${mappedLabels}</div>`;
}

const renderLabel = ({ name, color }) => `<span class="badge label ${color}">${name}</span>`

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

const renderAttachment = ({ id, idMember, name, url, fileName, date, mimeType }) =>
`<div class="attachment p-3 my-2" title="${name}" id="${id}">
    <a href="${url}" class="btn text-gray" onclick="window.open('${url}', '_blank')">
        <span class="attachment-title">${name ? name : fileName}</span>
    </a>
</div>`

const renderAttachments = ({ attachments }) => 
`<div class="attachments">
    <span class="attachments-title h3">Archivos adjuntos</span>
    <div class="attachment-files">
        ${attachments?.map(renderAttachment).join('')}
    </div>
</div>`

const renderChecklistItem = ({ id, name, state }) => 
`<div class="checklist-item">
    <div class="form-check">
        <input class="form-check-input" type="checkbox" ${state ? 'checked' : ''} id="${id}">
        <label class="form-check-label mb-0" for="${id}">${marked(name)}</label>
    </div>
</div>`

const renderChecklist = ({ id, name, checkItems }) => 
`<div class="checklist my-3 card border-0 p-3" id="${id}">
    <span class="checklist-title h4">${name}</span>
    <div class="checklist-items h6">${checkItems.map(renderChecklistItem).join('')}</div>
</div>`;

const renderChecklists = ({ checklists }) => 
`<div class="checklist">${checklists.map(renderChecklist).join('')}</div>`;

const renderComment = ({ id, member, text }) => 
`<div class="comment my-3 d-flex" id="${id}">
    <div class="comment-creator">
        ${renderMember(member)}
    </div>
    <div class="comment-content border bg-white w-100 shadow-sm p-3">
        ${marked(text.replaceAll('\n', `<br />`))}
    </div>
</div>`

const renderComments = ({ comments }) => 
`<div class="comments">${comments?.map(renderComment).join('')}</div>`

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