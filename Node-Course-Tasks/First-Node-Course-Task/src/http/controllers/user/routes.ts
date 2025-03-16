import { FastifyInstance } from 'fastify';
import { register } from './register';
import { authenticate } from './authenticate';
import { get } from './get';
import { deleteUser } from './delete';
import { update } from './update';
import { refresh } from './refresh';
import { verifyJWT } from 'src/http/middlewares/verify-jwt';
import { profile } from './profile';
import { getAll } from './get-all';
import { getAllPosts } from './get-posts';

export function userRoutes(app: FastifyInstance) {
    app.get('/users/:userID', get);
    app.get('/users', getAll);
    app.get('/users/:userID/posts', getAllPosts);
    app.get('/profile', { onRequest: [verifyJWT] }, profile);

    app.post('/users', register);
    app.post('/authenticate', authenticate);

    app.delete('/users/:userID', deleteUser);

    app.patch('/users/:userID', update)
    app.patch('/token/refresh', refresh);
}
