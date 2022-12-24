import express from 'express';
import fs from 'fs';
import path from 'path';
import ResizeObject from './ResizeObject.interface'
import { Request, Response } from 'express';
import {transform, getImage} from './ImageHandling';

const app = express();
const port = 3000;
const imageFolderPath = path.join(__dirname, '..', 'static', 'img');


app.get('/api/images', async (req:Request, res:Response):Promise<void> => {
    let responseFromSecondFunction:ResizeObject={status:'', msg:''};
    try {
        const name: string = req.query.filename as string;
        const width: number = req.query.width as unknown as number;
        const height: number = req.query.height as unknown as number;
        if(!width || !height || !name) throw new Error('Missing parametrs! please provide all required parametrs')
        if((typeof Number(width) !== 'number' || width <= 0  ) || (typeof Number(height) !== 'number' || height <= 0  )) throw new Error('Incorect values! please provide a correct values to the parametrs')
        const originalImagePath = path.join(imageFolderPath, name);
        const imageThumbPath = path.join(
            imageFolderPath,
            '..',
            'thumbnail',
            name.split('.')[0] + `_${width}_${height}_thumb.jpg`
        );
        if(fs.existsSync(originalImagePath)){
            if (!fs.existsSync(imageThumbPath)) {
                responseFromSecondFunction = await transform(originalImagePath, width, height)
            }
        }
        else{
            throw new Error(`${name} : This image doesn't existe`)
        }
        if(responseFromSecondFunction.status==="error"){
            res.send(responseFromSecondFunction.msg)
        }else{
            res.status(200)
            setTimeout(async ()=>{
                res.send(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <title>Document</title>
                        <script src="../src/index.ts"></script>
                    </head>
                    <body>
                        <div style="margin-left: 25%;margin-top: 10%">
                            <img src=${await getImage(imageThumbPath)} alt=${name}>
                        </div>
                    </body>
                    </html>
                `);
            }, 1000)
        }
    } catch (err) {
        res.send(`something wrong happened : ${err}` )
    }
});



app.listen(port, () => {
    console.log(`server is running at localhost:${port}`);
});


export default app;