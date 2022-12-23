import supertest from 'supertest';
import app from '../index';
import path from 'path';
import fs from 'fs'

const request = supertest(app);

describe('the api should passes all those tests', () => {
    it('should get the endpoint api/images', async () => {
        const testPath =
            path.join(__dirname, '..', '..', 'static', 'thumbnail', 'fjord_thumb.jpg');
        const response = await request.get(
            '/api/images?filename=fjord.jpg&width=360&height=350'
        );
        expect(response.text).toBe(testPath);
    });
    it('a new image should be situated at thumbnail folder when getting the endpoint', async () => {
        const response = await request.get(
            '/api/images?filename=icelandwaterfall.jpg&width=360&height=350'
        );
        setTimeout(()=>{
            expect(fs.existsSync(response.text)).toBe(true);
        }, 1000)
        
    });
    it('expect transform to not throw error', async () => {
        const ErrorMsgPath =
            'D:\\Projets\\Udacity-exercices-projects\\image processing api\\static\\img\\encenadaport.jpg';
        expect(async ()=>
            await request.get(
                '/api/images?filename=encenadaport.jpg&width=300&height=350'
            )
        ).not.toThrowError(Error, `The following image occured :  ${ErrorMsgPath} is not readable or doesn't exist`);
    });
    it('expect transform to return error message', async () => {
        const fileName =
            'inexitant.jpg';
        const response = await request.get(
            '/api/images?filename=inexitant.jpg&width=300&height=350'
        );
        expect(response.text).toBe(
            `${fileName} : This image doesn't existe`
        );
    });
});
