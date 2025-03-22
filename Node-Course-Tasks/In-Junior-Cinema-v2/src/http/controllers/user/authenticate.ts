import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { AuthenticateUserUseCase } from "src/use-cases/users/authenticate-user-use-case";
import { z } from 'zod';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const authenticateUseCase = new AuthenticateUserUseCase(prismaUsersRepository);
        
        const { user } = await authenticateUseCase.execute({
            email,
            password
        });

        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id
            }
        });

        const refreshToken = await reply.jwtSign({}, {
            sign: {
                sub: user.id,
                expiresIn: '7d'
            }
        });
        
        return reply
              .status(200)
              .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true
              })
              .send({ token: token });
    } catch (error) {
        throw error;
    }
};
