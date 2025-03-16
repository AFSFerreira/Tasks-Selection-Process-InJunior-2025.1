import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-posts-repository";
import { DeletePostUseCase } from "src/use-cases/posts/delete-post-use-case";
import { ResourceNotFoundError } from "src/use-cases/posts/errors/resource-not-found-error";
import { z } from "zod";


export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        postID: z.string().uuid()
    })

    const { postID } = createBodySchema.parse(request.params);

    try {
        const prismaPostsRepository = new PrismaPostsRepository();
        const deletePostUseCase = new DeletePostUseCase(prismaPostsRepository);

        const deletedPost = await deletePostUseCase.execute({
            postID: postID
        });

        return reply.status(200).send({ post: deletedPost });
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
        throw error;
    }
}
