import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaCommentsRepository } from "src/repositories/prisma/prisma-comments-repository";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { UpdateCommentUseCase } from "src/use-cases/comments/update-comment-use-case";
import { ResourceNotFoundError } from "src/use-cases/users/errors/resource-not-found-error";
import { UpdateUserUseCase } from "src/use-cases/users/update-user-use-case";
import { z } from 'zod';

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateBodySchema = z.object({
        content: z.string()
    });

    const updateParamsSchema = z.object({
        commentID: z.string().uuid()
    });

    const { content } = updateBodySchema.parse(request.body);
    const { commentID } = updateParamsSchema.parse(request.params);

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository();
        const updateCommentUseCase = new UpdateCommentUseCase(prismaCommentsRepository);

        const comment = await updateCommentUseCase.execute({
            commentID: commentID,
            commentUpdateData: {
                content: content
            }
        });

        return reply.status(200).send({ comment })
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
        throw error;
    }
};
