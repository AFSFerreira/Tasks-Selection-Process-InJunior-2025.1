import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaCommentsRepository } from "src/repositories/prisma/prisma-comments-repository";
import { GetAllLikesUseCase } from "src/use-cases/comments/get-all-likes-use-case";
import { z } from "zod";

export async function getAllLikesComment(request: FastifyRequest, reply: FastifyReply) {
    const getLikesParamsSchema = z.object({
        commentID: z.string().uuid()
    });

    const { commentID } = getLikesParamsSchema.parse(request.params);

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository();
        const getLikesCommentUseCase = new GetAllLikesUseCase(prismaCommentsRepository);

        const allLikes = await getLikesCommentUseCase.execute({
            commentID: commentID
        });

        return reply.status(200).send(allLikes);
    } catch (error) { throw error };

}
