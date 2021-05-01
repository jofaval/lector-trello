
/**
 * Permite poder hacer scroll con el drag del mouse
 * 
 * @source https://htmldom.dev/drag-to-scroll/
 */
export const scrollWithMouse = () => {
    // El elemento prinicpal sobre el cual se detecta modifica el scroll
    const element = document.querySelector('#content');
    element.style.cursor = 'grab';

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    /**
     * Se ejecuta cuando se presiona el clic izquierdo del ratón
     * 
     * @param {event} e El evento principal de la ventaa
     * @returns void
     */
    const mouseDownHandler = (e) => {
        element.style.cursor = 'grabbing';
        element.style.userSelect = 'none';

        pos = {
            left: element.scrollLeft,
            top: element.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    /**
     * Se ejecuta cuando se mantiene el clic izquierdo y se detecta movimiento del ratón
     * 
     * @param {event} e El evento principal de la ventaa
     * @returns void
     */
    const mouseMoveHandler = (e) =>  {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        element.scrollTop = pos.top - dy;
        element.scrollLeft = pos.left - dx;
    };

    /**
     * Se ejecuta cuando se suelta el clic izquierdo del ratón
     * 
     * @param {event} e El evento principal de la ventaa
     * @returns void
     */
    const mouseUpHandler = () => {
        element.style.cursor = 'grab';
        element.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    element.addEventListener('mousedown', mouseDownHandler);
}

export default scrollWithMouse;