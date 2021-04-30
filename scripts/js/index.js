import { leerContenidoDelFichero } from "./lector.js";
import { filename } from "./config.js";
import parse from "./parser.js";
import render from "./render.js";

const init = async () => {
    let result = await leerContenidoDelFichero(filename);
    console.log('og result', result);
    
    let parsed = parse(result);
    console.log('resultado', parsed);

    let rendered = render(parsed);
    console.log('renderizado', rendered);
}

init();