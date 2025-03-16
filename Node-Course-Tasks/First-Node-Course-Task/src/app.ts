import { fastify, FastifyRequest } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { fastifyCookie } from '@fastify/cookie';
import { fastifyJwt } from '@fastify/jwt';
import { env } from './env';
import { ZodError } from 'zod';
import { userRoutes } from './http/controllers/user/routes';
import { postRoutes } from './http/controllers/posts/routes';

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
        expiresIn: '10m'
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

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) 
        return reply.status(400).send({ message: 'Validation error', issues: error.format()})
    return reply.status(500).send({ message: 'Internal server error' });
})
