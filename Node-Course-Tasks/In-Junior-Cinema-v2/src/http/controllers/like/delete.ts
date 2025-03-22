import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaLikesRepository } from "src/repositories/prisma/prisma-likes-repository";
import { DeleteLikeUseCase } from "src/use-cases/likes/delete-like-use-case";

export async function deleteLike(request: FastifyRequest, reply: FastifyReply) {
    const deleteBodySchema = z.object({
        likeID: z.string().uuid()
    });

    const { likeID } = deleteBodySchema.parse(request.params);

    try {
        const prismaLikesRepository = new PrismaLikesRepository();
        const deleteLikeUseCase = new DeleteLikeUseCase(prismaLikesRepository);

        const deletedLike = await deleteLikeUseCase.execute({
            likeID: likeID
        });

        return reply.status(204).send({ deletedLike });
    } catch (error) { throw error };
}
