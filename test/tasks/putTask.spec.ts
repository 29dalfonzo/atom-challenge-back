
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

    it('should update a task', async () => {
        let newTask = {
            id: task.id,
            title: 'test2',
            description: 'test2',
            done: false,
            user_id: task.user_id
        }
        const response = await api
            .put(`/tasks/${task.id}`)
            .send(newTask)
            .set('Authorization', `Bearer ${token}`);


        expect(response.status).toBe(200);
        expect(response.body.title).toBe(newTask.title);
        expect(response.body.description).toBe(newTask.description);
        expect(response.body.done).toBe(newTask.done);
    });

    it('should not update a task', async () => {
        const response = await api
            .put(`/tasks/${task.id}`)
            .send()
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(401);
    });
});


