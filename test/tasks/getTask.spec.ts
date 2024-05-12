import request from 'supertest';
import {server, closeServer } from '../../src/index'; 


const api=  request(server);

const user ='test@test.com'
let token = '';

describe('Task API', () => {

    beforeAll(async () => {
        const loginResponse = await api
            .get(`/users/${user}`)
            .send();
        expect(loginResponse.status).toBe(200);
        token = loginResponse.body.token;
    });

    afterAll(async () => {
        await closeServer();
    });


    it('should retrieve task data', async () => {
        const res = await api
        .get('/tasks/')
        .set('Authorization', `Bearer ${token}`)
        .send();
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
      } );

        it('should not retrieve task data', async () => {
            const res = await api
            .get('/tasks/')
            .send();
            expect(res.status).toBe(401);
            expect(res.body).toEqual({ message: "Unauthorized" });
        });


});

