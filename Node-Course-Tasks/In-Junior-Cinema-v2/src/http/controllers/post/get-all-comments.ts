import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-posts-repository";
import { ResourceNotFoundError } from "src/use-cases/comments/errors/resource-not-found-error";
import { GetAllCommentUseCase } from "src/use-cases/posts/get-post-comments-use-case";
import { z } from 'zod';

export async function getAllComments(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        postID: z.string().uuid()
    });

    const { postID } = getParamsSchema.parse(request.params);

    try {
        const prismaPostsRepository = new PrismaPostsRepository();
        const getPostCommentsUseCase = new GetAllCommentUseCase(prismaPostsRepository);

        const comments = await getPostCommentsUseCase.execute({
            postID: postID
        });

        return reply.status(200).send({ comments })
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
        throw error;
    }
};
