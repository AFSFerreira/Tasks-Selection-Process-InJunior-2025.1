import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "src/use-cases/users/errors/resource-not-found-error";
import { GetUserLikesUseCase } from "src/use-cases/users/get-user-likes-use-case";
import { z } from 'zod';

export async function getAllLikes(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        userID: z.string().uuid()
    });

    const { userID } = getParamsSchema.parse(request.params);

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const getAllLikesUseCase = new GetUserLikesUseCase(prismaUsersRepository);

        const likes = await getAllLikesUseCase.execute({
            userID: userID
        });

        return reply.status(200).send({ likes: likes })
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
        throw error;
    }
};
