import { leerContenidoDelFichero } from "./lector.js";
import { filename } from "./config.js";

let result = leerContenidoDelFichero(filename);

console.log('resultado', result);