import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { LikeOrCommentError } from "./errors/like-or-comment-error";
import { LikeAndCommentError } from "./errors/like-and-comment-error";
import { PrismaLikesRepository } from "src/repositories/prisma/prisma-likes-repository";
import { CreateLikeUseCase } from "src/use-cases/likes/create-like-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        postID: z.string().optional(),
        commentID: z.string().optional()
    });

    const { postID, commentID } = createBodySchema.parse(request.body);
    const userID = request.user.decodedToken;

    // Verificação de existência mutualmente exclusiva de postID e commentID:
    if (!(postID || commentID)) {
        throw new LikeOrCommentError();
    }

    if (postID && commentID) {
        throw new LikeAndCommentError();
    }

    try {
        const prismaLikesRepository = new PrismaLikesRepository();
        const createLikeUseCase = new CreateLikeUseCase(prismaLikesRepository);

        await createLikeUseCase.execute({
            userID: userID,
            postID: postID,
            commentID: commentID
        });
    } catch (error) { throw error };

    return reply.status(201).send('Like criado com sucesso');
}
