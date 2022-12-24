import fs from 'fs';
import { imageSize } from 'image-size';
import path from 'path';
import supertest from 'supertest';
import { transform } from '../ImageHandling';
import app from '../index';

const request = supertest(app);

describe('the api should passes all those tests', () => {
    it('should get the endpoint api/images', async () => {
        const testPath =
            path.join(__dirname, '..', '..', 'static', 'thumbnail', 'fjord_360_350_thumb.jpg');
        const response = await request.get(
            '/api/images?filename=fjord.jpg&width=360&height=350'
        );
        expect(response.error).toBeFalsy();
        expect(response.statusCode).toBe(200);
        expect(typeof response.text).toBe('string');
    });
    it('a new image should be situated at thumbnail folder when calling transform', async () => {
        const imagePath = path.join(__dirname, '..', '..', 'static', 'img', 'icelandwaterfall.jpg')
        const resultPath = path.join(__dirname, '..', '..', 'static', 'thumbnail', 'icelandwaterfall_206_311_thumb.jpg')
        const width = 206
        const height = 311
        if(fs.existsSync(resultPath)===true) fs.unlinkSync(resultPath)
        await transform(imagePath, width, height)
        setTimeout(()=>{
            expect(fs.existsSync(resultPath)).toBe(true);
        }, 1000)
    });
    it('The new image should have the same dimensions', async () => {
        const imagePath = path.join(__dirname, '..', '..', 'static', 'img', 'icelandwaterfall.jpg')
        const verifyPath = path.join(__dirname, '..', '..', 'static', 'thumbnail', 'icelandwaterfall_207_312_thumb.jpg')
        const width = 207
        const height = 312
        if(fs.existsSync(verifyPath)===true) fs.unlinkSync(verifyPath)
        await transform(imagePath, width, height)
        setTimeout(()=>{
            const dimensions = imageSize(verifyPath)
            expect(dimensions.width===width && dimensions.height===height).toBe(true);
        }, 1000)
    });
    it('expect transform to not return error message', async () => {
        const imagePath = path.join(__dirname, '..', '..', 'static', 'img', 'encenadaport.jpg')
        const width = 206
        const height = 311
        expect(async ()=>{
            const response = await transform(imagePath, width, height)
            return response.status
        }
        ).not.toBe('Error');
    });
    it('expect the endpoint to return error message', async () => {
        const fileName =
            'inexitant.jpg';
        const response = await request.get(
            '/api/images?filename=inexitant.jpg&width=300&height=350'
        );
        expect(response.text).toBe(
            `something wrong happened : Error: ${fileName} : This image doesn't existe`
        );
    });
});
