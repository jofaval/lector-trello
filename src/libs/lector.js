/**
 * Lee el contenido de un fichero dada la ruta
 * 
 * @param {string} ruta 
 * @returns object
 */
export const leerContenidoDelFichero = async ruta => {
    // console.log('se va a leer el contenido de', ruta);

    const content = await fetch(ruta)
        .then(onLecturaFichero)
        .catch(onLecturaFicheroError);

    // console.log('respuesta', content);

    return content;
}

/**
 * Se ejecuta cuando se ha terminado de leer el fichero,
 * lo parsea a JSON
 * 
 * @param {*} _res 
 * @returns object
 */
const onLecturaFichero = async _res => {
    // console.log('respuesta', _res);

    return _res?.json().then(data => data)
}

/**
 * Se ejecuta cuando ocurre un error en la lectura del fichero
 * 
 * @param {object} _res 
 * @returns void
 */
const onLecturaFicheroError = _res => {
    console.error('error respuesta', _res);
}

export default leerContenidoDelFichero;