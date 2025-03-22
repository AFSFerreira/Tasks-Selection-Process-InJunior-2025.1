import { FastifyInstance } from 'fastify';
import { authenticate } from './authenticate';
import { deleteUser } from './delete';
import { get } from './get';
import { getAll } from './get-all';
import { getAllPosts } from './get-posts';
import { profile } from './profile';
import { refresh } from './refresh';
import { register } from './register';
import { update } from './update';
import { decodeJWTMiddleware } from 'src/http/middlewares/decode-jwt';
import { getAllComments } from './get-all-comments';
import { getAllLikes } from './get-all-likes';

export function userRoutes(app: FastifyInstance) {
    app.get('/users/:userID', get);
    app.get('/users/:userID/posts', getAllPosts);
    app.get('/profile', { onRequest: [decodeJWTMiddleware] }, profile);
    app.get('/users/:userID/comments', getAllComments);
    app.get('/users/:userID/likes', getAllLikes);
    app.get('/users', getAll);

    app.post('/users', register);
    app.post('/authenticate', authenticate);

    app.delete('/users/:userID', { onRequest: [decodeJWTMiddleware] }, deleteUser);

    app.patch('/users', { onRequest: [decodeJWTMiddleware] }, update);
    app.patch('/token/refresh', refresh);
}
