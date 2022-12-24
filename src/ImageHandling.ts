import sharp from 'sharp';
import ResizeObject from './ResizeObject.interface'
import path from 'path';
import fs from 'fs'


async function transform(
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
        listPaths[listPaths.length - 1].split('.')[0] + `_${width}_${height}_thumb.jpg`
    );
    const fileContent:Buffer = fs.readFileSync(imagePath)
    sharp(fileContent)
    .resize(Number(width), Number(height))
    .toFile(overridePath, (err, info) => {
        if(info){
            resultObject.status = "success"
            resultObject.msg = "operation succeded"
            return resultObject
        }else if(err){
            resultObject.status = "error"
            resultObject.msg = `problem occured in resizing image , ${err}`
            return resultObject
        }
    });
    return resultObject
}


async function getImage(imagePath:string):Promise<string>{
    const file:Buffer = fs.readFileSync(imagePath)
    const imageDataBase64:string = Buffer.from(file).toString('base64');
    const imageDataURI = `data:image/jpeg;base64,${imageDataBase64}`;
    return(imageDataURI)
}


export { transform, getImage}