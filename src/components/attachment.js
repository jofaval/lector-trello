/**
 * Renderiza visualmente un archivo adjunto
 * 
 * @param {object} data 
 * @returns 
 */
export const renderAttachment = ({ id, idMember, name, url, fileName, date, mimeType }) =>
`<div class="attachment p-3 my-2" title="${name}" id="${id}">
    <a href="${url}" class="btn text-gray" onclick="window.open('${url}', '_blank')">
        <span class="attachment-title">${name ? name : fileName}</span>
    </a>
</div>`

/**
 * Renderiza visualmente todos los archivos adjuntos
 * 
 * @param {object} data 
 * @returns string
 */
export const renderAttachments = ({ attachments }) => 
`<div class="attachments">
    <span class="attachments-title h3">Archivos adjuntos</span>
    <div class="attachment-files">
        ${attachments?.map(renderAttachment).join('')}
    </div>
</div>`

export default renderAttachments