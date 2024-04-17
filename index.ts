import express, { Express, Request, Response } from "express";
import fs from 'fs';
import { getImagePathByName } from "./src/picture";

const PATH_TO_IMAGES: string = './images';
const PICTURES: string[] = fs.readdirSync(PATH_TO_IMAGES);

const app: Express = express();
const appPort: number = 3001;

app.use(express.json());

app.get('/random_picture', (req: Request, res: Response) => {
    console.log(__dirname);
    res.sendFile(getImagePathByName(PATH_TO_IMAGES, PICTURES, undefined), { root: __dirname });
})

app.post('/picture', (req: Request, res: Response) => {
    const requestedPicture = req.body.picture;

    if (!requestedPicture) {
        return res.sendStatus(400);
    }

    let pathToImage: string = '';
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

    fs.access(pathToImage, fs.constants.F_OK, (err: Error | null) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.sendFile(pathToImage);
        }
    });

})

app.listen(appPort, () => console.log('API Server is up and running...'));
