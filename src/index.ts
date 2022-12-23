import express from 'express';
import fs from 'fs';
import sizeOf from 'image-size';
import path from 'path';
import sharp from 'sharp';
import ResizeObject from './ResizeObject.interface'
import { Request, Response } from 'express';

const app = express();
const port = 3000;
const imageFolderPath = path.join(__dirname, '..', 'static', 'img');


app.get('/api/images', async (req:Request, res:Response) => {
    let responseFromSecondFunction:ResizeObject={status:'', msg:''};
    try {
        const name: string = req.query.filename as string;
        const originalImagePath = path.join(imageFolderPath, name);
        const imageThumbPath = path.join(
            imageFolderPath,
            '..',
            'thumbnail',
            name.split('.')[0] + '_thumb.jpg'
        );
        const width: number = req.query.width as unknown as number;
        const height: number = req.query.height as unknown as number;
        if(fs.existsSync(originalImagePath)){
            if (fs.existsSync(imageThumbPath)) {
                const dimensions = sizeOf(imageThumbPath);
                const thumbImageWidth: number = dimensions.width as unknown as number;
                const thumbImageHeight: number = dimensions.height as unknown as number;
                if (width !== thumbImageWidth || height !== thumbImageHeight) {
                    responseFromSecondFunction = await giveOtherDim(originalImagePath, width, height)
                }
            } else {
                responseFromSecondFunction = await giveOtherDim(originalImagePath, width, height)
            }
        }
        else{
            responseFromSecondFunction.status = "error"
            responseFromSecondFunction.msg = `${name} : This image doesn't existe`
        }
        if(responseFromSecondFunction.status==="error"){
            res.send(responseFromSecondFunction.msg)
        }else{
            res.send(imageThumbPath);
        }
    } catch (err) {
        res.send(`something wrong happened : ${err}` )
    }
});

async function giveOtherDim(
    imagePath: string,
    width: number,
    height: number
): Promise<ResizeObject>{
    const resultObject:ResizeObject={ status:'', msg:'' };
    const listPaths = imagePath.split('\\');
    const listPathWithoutLastElement = listPaths.slice(0, listPaths.length - 2);
    const newImagePath = path.join(...listPathWithoutLastElement);
    const overridePath = path.join(
        newImagePath,
        'thumbnail',
        listPaths[listPaths.length - 1].split('.')[0] + '_thumb.jpg'
    );
    // let image: Buffer;
    // fs.access(imagePath, fs.constants.R_OK, async (error) => {
    //     if (!error) {
    const fileContent:Buffer = fs.readFileSync(imagePath)
    // async (err, data) => {
    //     // const fsReadFileResult:ResizeObject = {status:'', msg:''}
    //     if (data) {
    sharp(fileContent)
    .resize(Number(width), Number(height))
    .toFile(overridePath, (err, info) => {
        if(info){
            resultObject.status = "success"
            resultObject.msg = "operation succeded"
            // console.log('the value of the variable resultObject is : ', resultObject)
            return resultObject
        }else if(err){
            resultObject.status = "error"
            resultObject.msg = `problem occured in resizing image , ${err}`
            console.log('the value of the variable resultObject is : ', resultObject)
            return resultObject
        }
    });
    return resultObject
        // } else if (err) {
        //     resultObject.status = "error"
        //     resultObject.msg = `Problem while reading the existing file , ${err}`
        //     return resultObject
        // }
    // });
        // } else {
        //     resultObject.status = "error"
        //     resultObject.msg = `${imagePath} is not readable or doesn't exist`
        // }
        // console.log('the value of the variable resultObject is : ', resultObject)
    // });
    // resultObject.status = fsReadFileResult.status
    // resultObject.msg = fsReadFileResult.msg
}


app.listen(port, () => {
    console.log(`server is running at localhost:${port}`);
});


export default app;