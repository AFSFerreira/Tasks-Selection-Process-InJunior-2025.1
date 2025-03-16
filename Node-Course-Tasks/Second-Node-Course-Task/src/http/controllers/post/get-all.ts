import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-posts-repository";
import { GetAllPostUseCase } from "src/use-cases/posts/get-all-posts-use-case";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaPostsRepository = new PrismaPostsRepository();
        const getAllPostsUseCase = new GetAllPostUseCase(prismaPostsRepository);

        const AllPosts = await getAllPostsUseCase.execute();

        return reply.status(200).send({ AllPosts })
    } catch (error) {
        throw error;
    }
};
