import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-posts-repository";
import { ResourceNotFoundError } from "src/use-cases/comments/errors/resource-not-found-error";
import { GetPostUseCase } from "src/use-cases/posts/get-post-use-case";
import { z } from 'zod';

export async function get(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        postID: z.string().uuid()
    });

    const { postID } = getParamsSchema.parse(request.params);

    try {
        const prismaPostsRepository = new PrismaPostsRepository();
        const getPostUseCase = new GetPostUseCase(prismaPostsRepository);

        const post = await getPostUseCase.execute({
            postID: postID
        });

        return reply.status(200).send({ post: post })
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
        throw error;
    }
};
