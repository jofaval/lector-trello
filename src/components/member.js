/**
 * El radio de la imagen
 * 
 * @var int
 */
const radius = 30;

/**
 * Renderiza visualmente a un solo miembro
 * 
 * @param {object} member 
 * @returns string
 */
export const renderMember = ({ id, url, fullName, initials, avatarUrl }) => 
`<div class="member" id="${id}">
    <a href="${url}" style="min-width: 50px" class="btn p-0 m-0 text-dark" title='${fullName}' onclick="window.open('${url}', '_blank')">
        <img class="img bg-white rounded-circle" width="${radius}" height="${radius}" src="${avatarUrl}/original.png" alt='${initials}'>
    </a>
</div>`;

/**
 * Renderiza visualmente a todos los miembros
 * 
 * @param {object} data 
 * @returns string
 */
export const renderMembers = ({ members }) => `<div class="members mb-3 d-inline-flex">${members?.map(renderMember)?.join('')}</div>`;

export default renderMembers;