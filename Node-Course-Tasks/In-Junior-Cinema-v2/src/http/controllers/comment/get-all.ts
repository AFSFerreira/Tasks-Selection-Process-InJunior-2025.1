import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaCommentsRepository } from "src/repositories/prisma/prisma-comments-repository";
import { GetAllCommentsUseCase } from "src/use-cases/comments/get-all-comment-use-case";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaCommentsRepository = new PrismaCommentsRepository();
        const getAllCommentUseCase = new GetAllCommentsUseCase(prismaCommentsRepository);
        
        const allComments = await getAllCommentUseCase.execute();

        return reply.status(200).send(allComments);
    } catch (error) { throw error };
}
