import request from 'supertest';
import {server, closeServer} from '../../src/index'; 


const api=  request(server);
let user = '';

describe('User API', () => {
    beforeAll(async () => {
         user = `test_${Math.floor(Math.random() * 10000)}@test.com`;
    });
    afterAll(async () => {
        await closeServer();
    });
    it('should retrieve user data', async () => {
        const res = await api
        .get('/users/test@test.com')
        .send();
        expect(res.status).toBe(200);
      } );

      it('should not retrieve user data', async () => {
        const res = await api
        .get('/users/testtesttest@test.com')
        .send();
        expect(res.status).toBe(404);
      });

      it('should not create a new user', async () => {
        const newUser = {
            email: 'test@test.com'
        }
        const res = await api
        .post('/users')
        .send(newUser);
        expect(res.status).toBe(400);
    });

        it.skip('should create a new user', async () => {
            const newUser = {
                email: user
            }
            const res = await api
            .post('/users')
            .send(newUser);
            expect(res.status).toBe(201);
        });
    });

