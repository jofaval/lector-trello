export const render = data => {
    const backgroundImage = renderBackgroundImage(data)
}

const renderBackgroundImage = data => {
    const { bgImage } = data;
    document.body.style.backgroundImage = `url("${bgImage}")`;
}

export default render