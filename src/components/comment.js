import { renderMember } from "./member.js"

export const renderComment = ({ id, member, text }) => 
`<div class="comment my-3 d-flex" id="${id}">
    <div class="comment-creator">
        ${renderMember(member)}
    </div>
    <div class="comment-content border bg-white w-100 shadow-sm p-3">
        ${marked(text.replaceAll('\n', `<br />`))}
    </div>
</div>`

export const renderComments = ({ comments }) => 
`<div class="comments">${comments?.map(renderComment).join('')}</div>`

export default renderComments