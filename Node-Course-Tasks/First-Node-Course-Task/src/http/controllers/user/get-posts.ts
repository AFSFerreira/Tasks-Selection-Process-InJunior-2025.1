import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-posts-repository";
import { GetPostByUserUseCase } from "src/use-cases/posts/get-post-by-user-use-case";
import { ResourceNotFoundError } from "src/use-cases/users/errors/resource-not-found-error";
import { z } from 'zod';

export async function getAllPosts(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        userID: z.string().uuid()
    });

    const { userID } = updateParamsSchema.parse(request.params);

    try {
        const prismaPostsRepository = new PrismaPostsRepository();
        const getPostsUserUseCase = new GetPostByUserUseCase(prismaPostsRepository);

        const allUserPosts = await getPostsUserUseCase.execute({
            userID: userID
        });

        return reply.status(200).send({ posts: allUserPosts.posts })
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
        throw error;
    }
};
