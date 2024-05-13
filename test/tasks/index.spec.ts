
import request from 'supertest';
import {server, closeServer} from '../../src/index'; 


const api=  request(server);
describe('Server Initialization', () => {
    afterAll(async () => {
        await closeServer();
    });

    it('should start the server without errors', async () => {
        const response = await api.get('/users/test@test.com');
        expect(response.status).toBe(200);
    });

    it('should handle server errors gracefully', async () => {
        const response = await api.get('/nonexistentroute');
        expect(response.status).toBe(404);
    });
});
