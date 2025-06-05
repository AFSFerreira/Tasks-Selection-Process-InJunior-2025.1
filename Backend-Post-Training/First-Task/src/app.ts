import { fastifyCookie } from '@fastify/cookie';
import { fastifyCors } from '@fastify/cors';
import { fastifyJwt } from '@fastify/jwt';
import { fastify, FastifyReply, FastifyRequest } from 'fastify';
import { z, ZodError } from 'zod';
import { env } from './env';
import { commentRoutes } from './http/controllers/comment/routes';
import { LikeAndCommentError } from './http/controllers/like/errors/like-and-comment-error';
import { LikeOrCommentError } from './http/controllers/like/errors/like-or-comment-error';
import { likeRoutes } from './http/controllers/like/routes';
import { postRoutes } from './http/controllers/post/routes';
import { userRoutes } from './http/controllers/user/routes';
import { LikeAlreadyExistsError } from './use-cases/likes/errors/like-already-exists-error';
import { InvalidCredentialsError } from './use-cases/users/errors/invalid-credentials-error';
import './jobs/most-liked-posts-weekly-summary';
import './jobs/delete-comments';


export const app = fastify();


app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
});


app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '15m'
    },
    verify: {
        extractToken: (request: FastifyRequest) => {
            // Authorization: 'Baerer <Token>'
            if (request.headers.authorization) {
                do {
                    const authorizationToken = request.headers.authorization.split(' ').at(-1);
                    if (!authorizationToken) break;

                    try {
                        app.jwt.verify(authorizationToken!);
                        // Valid Token:
                        return authorizationToken;
                    } catch (error) {
                        // Invalid or Expired Token
                        break;
                    }
                    
                } while(false);
            }

            if (request.cookies?.refreshToken) {
                return request.cookies.refreshToken;
            }
        }
    }
});



app.register(fastifyCookie);
app.register(userRoutes);
app.register(postRoutes);
app.register(commentRoutes);
app.register(likeRoutes);


app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) 
        return reply.status(400).send({ message: 'Validation error', issues: error.format()})
    
    if (error instanceof LikeOrCommentError) {
        return reply.status(400).send({ message: "Missing \'postID\' or \'commentID\'" });
    }

    if (error instanceof LikeAndCommentError) {
        return reply.status(422).send({ message: "You must provide either \'postID\' or \'commentID\', but not both." });
    }

    if (error instanceof InvalidCredentialsError) {
        return reply.status(401).send({ message: error.message });
    }

    if (error instanceof LikeAlreadyExistsError) {
        return reply.status(409).send({ message: error.message });
    }

    console.log("Internal Error:", error.message);
    return reply.status(500).send({ message: 'Internal server error' });
});


export function decodeJWT(token: string | undefined): string | undefined {
    try {
        if (!token) throw new Error('Missing pr Undefined Token in Function decodeJWT');

        const decodedToken = app.jwt.decode<{ sub: string }>(token);

        return decodedToken?.sub;
    } catch (error) {
        return undefined;
    }
}


export function verifyAuthorizationToken(request: FastifyRequest, reply: FastifyReply): Boolean {
    const authorizationToken = request.headers.authorization;

    if (!authorizationToken) {
        reply.status(401).send({ message: "Authorization Token Not Found" });
        return false;
    }

    const authorizationTokenSchema = z.string().jwt();

    const authorizationTokenVerified = authorizationTokenSchema.parse(authorizationToken);

    try {
        app.jwt.verify(authorizationTokenVerified);
        return true;
    } catch (error) {
        reply.status(401).send({ message: "Invalid or Expired Authorization Token" });
        return false;
    }
}
