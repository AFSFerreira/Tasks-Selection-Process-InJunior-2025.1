import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { LikeOrCommentError } from "./errors/like-or-comment-error";
import { LikeAndCommentError } from "./errors/like-and-comment-error";
import { PrismaLikesRepository } from "src/repositories/prisma/prisma-likes-repository";
import { CreateLikeUseCase } from "src/use-cases/likes/create-like-use-case";
import { GetLikeUseCase } from "src/use-cases/likes/get-like-use-case";

export async function get(request: FastifyRequest, reply: FastifyReply) {
    const createParamsSchema = z.object({
        likeID: z.string().uuid()
    });

    const { likeID } = createParamsSchema.parse(request.params);

    try {
        const prismaLikesRepository = new PrismaLikesRepository();
        const getLikeUseCase = new GetLikeUseCase(prismaLikesRepository);

        const like = await getLikeUseCase.execute({
            likeID: likeID
        });
        
        return reply.status(200).send({ like });
    } catch (error) { throw error };
}
