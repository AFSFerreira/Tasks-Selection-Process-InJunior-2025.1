import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-posts-repository";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "src/use-cases/users/errors/resource-not-found-error";
import { GetUserPostsUseCase } from "src/use-cases/users/get-user-posts-use-case";
import { z } from 'zod';

export async function getAllPosts(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        userID: z.string().uuid()
    });

    const { userID } = updateParamsSchema.parse(request.params);

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const getPostsUserUseCase = new GetUserPostsUseCase(prismaUsersRepository);

        const allUserPosts = await getPostsUserUseCase.execute({
            userID: userID
        });

        return reply.status(200).send({ posts: allUserPosts })
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
        throw error;
    }
};
