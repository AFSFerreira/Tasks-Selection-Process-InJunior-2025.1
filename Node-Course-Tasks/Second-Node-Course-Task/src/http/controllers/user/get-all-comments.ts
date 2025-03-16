import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "src/use-cases/users/errors/resource-not-found-error";
import { GetUserCommentsUseCase } from "src/use-cases/users/get-user-comments-use-case";
import { z } from 'zod';

export async function getAllComments(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        userID: z.string().uuid()
    });

    const { userID } = getParamsSchema.parse(request.params);

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const getAllCommentsUseCase = new GetUserCommentsUseCase(prismaUsersRepository);

        const comments = await getAllCommentsUseCase.execute({
            userID: userID
        });

        return reply.status(200).send({ comments: comments })
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
        throw error;
    }
};
