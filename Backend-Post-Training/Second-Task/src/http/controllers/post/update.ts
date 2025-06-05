import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-posts-repository";
import { ResourceNotFoundError } from "src/use-cases/comments/errors/resource-not-found-error";
import { UpdatePostUseCase } from "src/use-cases/posts/update-post-use-case";
import { z } from 'zod';

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        postID: z.string().uuid()
    });

    const updateBodySchema = z.object({
        title: z.string().optional(),
        content: z.string().optional()
    });

    const { postID } = updateParamsSchema.parse(request.params);

    const { title, content } = updateBodySchema.parse(request.body);

    try {
        const prismaPostsRepository = new PrismaPostsRepository();
        const updatePostUseCase = new UpdatePostUseCase(prismaPostsRepository);

        const post = await updatePostUseCase.execute({
            postID: postID,
            postUpdateData: {
                title: title,
                content: content
            }
        });

        return reply.status(200).send({ post: post })
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
        throw error;
    }
};
