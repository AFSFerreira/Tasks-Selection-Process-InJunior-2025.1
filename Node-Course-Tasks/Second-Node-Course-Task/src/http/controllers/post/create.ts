import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-posts-repository";
import { CreatePostUseCase } from "src/use-cases/posts/create-post-use-case";
import { z } from "zod";


export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        title: z.string(),
        content: z.string()
    });

    const { title, content } = createBodySchema.parse(request.body);
    const userID = request.user.decodedToken;

    try {
        const prismaPostsRepository = new PrismaPostsRepository();
        const createPostUseCase = new CreatePostUseCase(prismaPostsRepository);

        await createPostUseCase.execute({
            title,
            content,
            userID
        });
    } catch(error) {
        throw error;
    }

    reply.status(201).send('Post criado com sucesso');
}
