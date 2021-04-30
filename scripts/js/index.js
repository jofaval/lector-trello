import { leerContenidoDelFichero } from "./lector.js";
import { filename } from "./config.js";
import parse from "./parser.js";

const init = async () => {
    let result = await leerContenidoDelFichero(filename);
    console.log('og result', result);
    
    let parsed = parse(result)
    console.log('resultado', parsed);
}

init();