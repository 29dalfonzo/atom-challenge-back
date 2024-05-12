import request from 'supertest';
import {app} from '../../src/index'; 

const api=  request(app);
let user = '';


describe('User API', () => {

    beforeAll(async () => {
         user = `test_${Math.floor(Math.random() * 10000)}@test.com`;
    });
    it('should retrieve user data', async () => {
        const expectedResponse = {
            email: 'test@test.com',
        }
        const res = await api
        .get('/users/test@test.com')
        .send();
        expect(res.status).toBe(200);
        expect(res.body.email).toEqual(expectedResponse.email);
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

        it('should create a new user', async () => {
            const expectedResponse = {
                message: 'Usuario creado con exito'
            }
            const newUser = {
                email: user
            }
            const res = await api
            .post('/users')
            .send(newUser);
            console.log('Status Code:', res.status);
            console.log('Body:', res.body);
            expect(res.status).toBe(201);
            expect(res.body.message).toEqual(expectedResponse.message);
        });

    });

