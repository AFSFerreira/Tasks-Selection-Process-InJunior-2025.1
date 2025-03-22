import { FastifyReply, FastifyRequest } from "fastify";
import { decodeJWT, verifyAuthorizationToken } from "src/app";

export async function decodeJWTMiddleware(request: FastifyRequest, reply: FastifyReply) {
    if (!verifyAuthorizationToken(request, reply)) return;
    
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
        return reply.status(401).send({ message: "Authorization token is missing" });
    }

    const decodedToken = decodeJWT(authorizationHeader);

    if (!decodedToken) {
        return reply.status(401).send({ message: "Invalid or Missing Authorization Token" });
    }

    request.user = {
        sub: request.headers.authorization!,
        decodedToken: decodedToken
    };
}
