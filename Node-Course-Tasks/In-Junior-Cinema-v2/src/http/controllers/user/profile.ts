import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { GetUserUseCase } from "src/use-cases/users/get-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getUserUseCase = new GetUserUseCase(prismaUsersRepository);

    const user = await getUserUseCase.execute({
        userID: request.user.decodedToken
    });

    return reply.status(200).send({
        user: {
            ...user,
            password: undefined
        }
    });
};
