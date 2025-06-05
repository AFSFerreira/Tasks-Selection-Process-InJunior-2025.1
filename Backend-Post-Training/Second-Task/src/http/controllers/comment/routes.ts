import { FastifyInstance } from "fastify";
import { create } from "./create";
import { decodeJWTMiddleware } from "src/http/middlewares/decode-jwt";
import { deleteComment } from "./delete";
import { getAll } from "./get-all";
import { getAllLikesComment } from "./get-all-likes";
import { get } from "./get";
import { update } from "./update";

export function commentRoutes(app: FastifyInstance) {
    app.get('/comments', getAll);
    app.get('/comments/:commentID', get);
    app.get('/comments/:commentID/likes', getAllLikesComment);
    
    app.post('/comments', { onRequest: [decodeJWTMiddleware] }, create);

    app.delete('/comments/:commentID', { onRequest: [decodeJWTMiddleware] }, deleteComment);

    app.patch('/comments/:commentID', { onRequest: [decodeJWTMiddleware] }, update);
}
