import { filename } from "./config.js";
import leerContenidoDelFichero from "./src/libs/lector.js";
import parse from "./src/libs/parser.js";
import render from "./src/libs/render.js";
import scrollWithMouse from "./src/libs/scroll.js";

/**
 * Carga el contenido del fichero JSON en el DOM
 * 
 * @param {object} content
 * @returns void
 */
const init = async (content = null) => {
    // Se lee el contenido del fichero
    let result = content ? content : await leerContenidoDelFichero(filename);
    console.log('contenido', result);
    
    // Se parsea
    let parsed = parse(result);
    console.log('parseado', parsed);

    // Y se representa visualmente
    let rendered = render(parsed);
    console.log('renderizado', rendered);
}

// Siempre se inicia por defecto al terminar de cargar la página
init();

// Se añade el evento de scroll principal
document.addEventListener('DOMContentLoaded', scrollWithMouse);