import request from 'supertest';
import {server, closeServer } from '../../src/index'; 
import { Task } from '../../src/models/task.model';


const api=  request(server);

const user ='test@test.com'
let token = '';


let task: Task = {
    id: 'test',
    title: 'test',
    description: 'test',
    done: false,
    user_id: 'AJ11hiSlMfVD5eW8iVmt',
    date: new Date()
}

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

    it('should create a new task', async () => {
        const response = await api
            .post('/tasks')
            .send(task)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
    });

    it('should not create a new task', async () => {
        const response = await api
            .post('/tasks')
            .send()
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);
    });

    it('should not create a new task without title', async () => {
        const response = await api
            .post('/tasks')
            .send({ description: 'test', done: false })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);
    });

    it('should not create a new task without description', async () => {
        const response = await api
            .post('/tasks')
            .send({ title: 'test', done: false })
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);
    });

    it('should not create a new task without done', async () => {
        const response = await api
            .post('/tasks')
            .send({ title: 'test', description: 'test', done: undefined})
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);
    });

});

