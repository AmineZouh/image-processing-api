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
            // console.log('the value of the variable resultObject is : ', resultObject)
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


function getImage(imagePath:string):string{
    const file:Buffer = fs.readFileSync(imagePath)
    const imageDataBase64:string = Buffer.from(file).toString('base64');
    const imageDataURI = `data:image/jpeg;base64,${imageDataBase64}`;
    return(imageDataURI)
}


export { transform, getImage}