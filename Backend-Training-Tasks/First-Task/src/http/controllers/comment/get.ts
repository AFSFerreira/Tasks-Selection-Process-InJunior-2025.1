import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaCommentsRepository } from "src/repositories/prisma/prisma-comments-repository";
import { GetCommentUseCase } from "src/use-cases/comments/get-comment-use-case";

export async function get(request: FastifyRequest, reply: FastifyReply) {
    const createParamsSchema = z.object({
        commentID: z.string().uuid()
    });

    const { commentID } = createParamsSchema.parse(request.params);

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository();
        const getCommentUseCase = new GetCommentUseCase(prismaCommentsRepository);

        const comment = await getCommentUseCase.execute({
            commentID: commentID
        });

        return reply.status(200).send({ comment });
    } catch (error) { throw error };
}
