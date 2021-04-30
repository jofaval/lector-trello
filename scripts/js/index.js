import { leerContenidoDelFichero } from "./lector.js";
import { filename } from "./config.js";
import parse from "./parser.js";
import render from "./render.js";

/**
 * Carga el contenido del fichero JSON en el DOM
 * 
 * @returns void
 */
const init = async () => {
    // Se lee el contenido del fichero
    let result = await leerContenidoDelFichero(filename);
    console.log('og result', result);
    
    // Se parsea
    let parsed = parse(result);
    console.log('resultado', parsed);

    // Y se representa visualmente
    let rendered = render(parsed);
    console.log('renderizado', rendered);
}

// Siempre se inicia por defecto al terminar de cargar la página
init();