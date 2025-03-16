import { FastifyInstance } from "fastify";
import { decodeJWTMiddleware } from "src/http/middlewares/decode-jwt";
import { create } from "./create";
import { deletePost } from "./delete";
import { get } from "./get";
import { getAll } from "./get-all";
import { update } from "./update";
import { getAllComments } from "./get-all-comments";
import { getAllLikes } from "./get-all-likes";

export function postRoutes(app: FastifyInstance) {
    app.get('/posts/:postID', get);
    app.get('/posts', getAll);
    app.get('/posts/:postID/comments', getAllComments);
    app.get('/posts/:postID/likes', getAllLikes);

    app.post('/posts', { onRequest: [decodeJWTMiddleware] }, create);

    app.delete('/posts/:postID', { onRequest: [decodeJWTMiddleware] }, deletePost);

    app.patch('/posts/:postID', { onRequest: [decodeJWTMiddleware] }, update);
}
