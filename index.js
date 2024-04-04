import express from 'express'
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getImagePathByName } from './src/picture.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PATH_TO_IMAGES = './images';
const PICTURES = fs.readdirSync(PATH_TO_IMAGES);

const app = express();

app.use(express.json());

app.get('/random_picture', (req, res) => {
    console.log(__dirname);
    res.sendFile(getImagePathByName(PATH_TO_IMAGES, PICTURES), { root: __dirname });
})

app.post('/picture', (req, res) => {
    const requestedPicture = req.body.picture;

    if (!requestedPicture) {
        return res.sendStatus(400);
    }

    let pathToImage;
    try{
        pathToImage = `${__dirname}/${getImagePathByName(PATH_TO_IMAGES, PICTURES, requestedPicture)}`;
    } catch (error) {
        if (error instanceof TypeError) {
            console.error(`Encorrect type of "picture". Request body:${req.body}`);
        } else {
            console.error('Unexpected error:', error);
        }
        res.sendStatus(400);
    }

    fs.access(pathToImage, fs.constants.F_OK, (err) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.sendFile(pathToImage);
        }
    });

})

app.listen(3001, () => console.log('API Server is up and running...'));
