import express from 'express'
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getImagePathByName } from './core/picture.js'

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

    if (!content) {
        return res.sendStatus(401);
    }

    res.sendFile(getImagePathByName(PATH_TO_IMAGES, PICTURES, requestedPicture), { root: __dirname });
})

app.listen(3001, () => console.log('API Server is up and running...'));
