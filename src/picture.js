import path from 'path';

function getImagePathByName(prefix, pictures, pictureName) {
    if (pictureName === undefined) {
        const randomPictureName = pictures[Math.floor(Math.random() * pictures.length)];
        console.log(`Following picture has been chosen: ${randomPictureName}`);
        return path.join(prefix, randomPictureName);
    }

    if (typeof pictureName !== 'string'){
        throw new TypeError(`Value ${pictureName} is not a string!`);
    }

    if (pictures.includes(pictureName)) {
        return path.join(prefix, pictureName);
    }

    for (const picture of pictures) {
        if (path.parse(picture).name === pictureName) {
            return path.join(prefix, picture);
        }
    }

    return `Picture ${pictureName} is not found!`
}

export { getImagePathByName };
