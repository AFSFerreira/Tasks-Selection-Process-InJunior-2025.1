import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaCommentsRepository } from "src/repositories/prisma/prisma-comments-repository";
import { CreateCommentUseCase } from "src/use-cases/comments/create-comment-use-case";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        content: z.string(),
        postID: z.string().uuid()
    });

    const { content, postID } = createBodySchema.parse(request.body);
    const userID = request.user.decodedToken;

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository();
        const createCommentUseCase = new CreateCommentUseCase(prismaCommentsRepository);

        await createCommentUseCase.execute({
            content: content,
            userID: userID,
            postID: postID
        });
    } catch (error) { throw error };

    return reply.status(201).send('Comentário criado com sucesso');
}
