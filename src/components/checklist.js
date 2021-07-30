/**
 * Renderiza visualmente todos los elementos de una lista de tareas
 * 
 * @param {object} param0 
 * @returns 
 */
export const renderChecklistItem = ({ id, name, state }) => 
`<div class="checklist-item">
    <div class="form-check">
        <input class="form-check-input" type="checkbox" ${state ? 'checked' : ''} id="${id}">
        <label class="form-check-label mb-0" for="${id}">${marked(name)}</label>
    </div>
</div>`;

/**
 * Renderiza visualmente una lista de tareas
 * 
 * @param {object} param0 
 * @returns 
 */
export const renderChecklist = ({ id, name, checkItems }) => 
`<div class="checklist my-3 card border-0 p-3" id="${id}">
    <span class="checklist-title h4">${name}</span>
    <div class="checklist-items h6">${checkItems.map(renderChecklistItem).join('')}</div>
</div>`;

/**
 * Renderiza visualmente todas las listas de tareas
 * 
 * @param {object} param0 
 * @returns 
 */
export const renderChecklists = ({ checklists }) => 
`<div class="checklist">${checklists.map(renderChecklist).join('')}</div>`;

export default renderChecklists;