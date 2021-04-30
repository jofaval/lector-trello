export const leerContenidoDelFichero = async ruta => {
    const content = await fetch(ruta)
        .then(onLecturaFichero)
        .catch(onLecturaFicheroError);

    // console.log('respuesta', content);

    return content;
}

const onLecturaFichero = async _res => {
    // console.log('respuesta', _res);

    return _res?.json().then(data => data)
}

const onLecturaFicheroError = _res => {
    // console.error('error respuesta', _res);
}

export default leerContenidoDelFichero;