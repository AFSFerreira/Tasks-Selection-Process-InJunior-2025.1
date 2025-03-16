import { FastifyInstance } from "fastify";
import { get } from "./get";
import { getAll } from "./get-all";
import { create } from "./create";
import { deletePost } from "./delete";
import { update } from "./update";

export function postRoutes(app: FastifyInstance) {
    app.get('/posts/:postID', get);
    app.get('/posts', getAll);

    app.post('/posts', create);

    app.delete('/posts/:postID', deletePost);

    app.patch('/posts/:postID', update);
}
