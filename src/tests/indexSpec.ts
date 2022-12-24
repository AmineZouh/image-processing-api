import supertest from 'supertest';
import app from '../index';
import path from 'path';
import fs from 'fs'
import { transform } from '../ImageHandling';

const request = supertest(app);

describe('the api should passes all those tests', () => {
    it('should get the endpoint api/images', async () => {
        const testPath =
            path.join(__dirname, '..', '..', 'static', 'thumbnail', 'fjord_thumb.jpg');
        const response = await request.get(
            '/api/images?filename=fjord.jpg&width=360&height=350'
        );
        expect(response.error).toBeFalsy();
        expect(response.statusCode).toBe(200);
        expect(typeof response.text).toBe('string');
        // expect(response.text).toMatch(/\*<html>\*/);
        // expect(response.text).toMatch(/\*<img\*/);
        // expect(response.text).toMatch(/\*<\/html>\*/);
    });
    it('a new image should be situated at thumbnail folder when getting the endpoint', async () => {
        const response = await request.get(
            '/api/images?filename=icelandwaterfall.jpg&width=360&height=350'
        );
        setTimeout(()=>{
            expect(fs.existsSync(response.text)).toBe(true);
        }, 1000)
        
    });
    it('expect transform to not return error message', async () => {
        const imagePath = path.join(__dirname, '..', '..', 'static', 'img', 'encenadaport.jpg')
        const width = 206
        const height = 311
        const ErrorMsgPath =
            'D:\\Projets\\Udacity-exercices-projects\\image processing api\\static\\img\\encenadaport.jpg';
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
