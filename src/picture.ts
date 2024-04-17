import path from 'path';

function getImagePathByName(prefix:string, pictures:string[], pictureName:string = undefined):string {
  if (pictureName === undefined) {
    const randomPictureName = pictures[Math.floor(Math.random() * pictures.length)];
      console.log(`Following picture has been chosen: ${randomPictureName}`);
      return path.join(prefix, randomPictureName);
  }

  if (pictures.includes(pictureName)) {
    return path.join(prefix, pictureName);
  }

  for (const picture of pictures) {
    if (path.parse(picture).name === pictureName) {
      return path.join(prefix, picture);
    }
  }

  return '';
}

export { getImagePathByName };
