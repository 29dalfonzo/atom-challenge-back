
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
        console.log('token', token)
    });

    afterAll(async () => {
        await closeServer();
    });


    it('should delete a task', async () => {
        const createResponse = await api
            .post('/tasks')
            .send(task)
            .set('Authorization', `Bearer ${token}`);
        expect(createResponse.status).toBe(201);
        const response = await api
            .delete(`/tasks/${task.id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('should not delete a task', async () => {
        const response = await api
            .delete(`/tasks/12kkkter`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });
});


