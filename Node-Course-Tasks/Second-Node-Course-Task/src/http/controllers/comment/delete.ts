import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaCommentsRepository } from "src/repositories/prisma/prisma-comments-repository";
import { DeleteCommentUseCase } from "src/use-cases/comments/delete-comment-use-case";
import { z } from "zod";

export async function deleteComment(request: FastifyRequest, reply: FastifyReply) {
    const deleteBodySchema = z.object({
        commentID: z.string().uuid()
    });

    const { commentID } = deleteBodySchema.parse(request.params);

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository();
        const deleteCommentUseCase = new DeleteCommentUseCase(prismaCommentsRepository);

        await deleteCommentUseCase.execute({
            commentID: commentID
        });
    } catch (error) { throw error };

    return reply.status(200).send('Comentário deletado com sucesso');
}
