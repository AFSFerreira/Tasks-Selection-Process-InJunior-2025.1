import { FastifyInstance } from "fastify";
import { create } from "./create";
import { decodeJWTMiddleware } from "src/http/middlewares/decode-jwt";
import { deleteLike } from "./delete";
import { get } from "./get";

export function likeRoutes(app: FastifyInstance) {
    app.get('/likes/:likeID', get);
    
    app.delete('/likes/:likeID', { onRequest: [decodeJWTMiddleware] }, deleteLike);
    
    app.post('/likes', { onRequest: [decodeJWTMiddleware] }, create);
}
