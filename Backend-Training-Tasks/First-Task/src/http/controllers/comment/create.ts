import { FastifyReply, FastifyRequest } from "fastify";
import { sendNewCommentEmail } from "src/emails/email-service";
import { PrismaCommentsRepository } from "src/repositories/prisma/prisma-comments-repository";
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-posts-repository";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { CreateCommentUseCase } from "src/use-cases/comments/create-comment-use-case";
import { ResourceNotFoundError } from "src/use-cases/users/errors/resource-not-found-error";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        content: z.string(),
        postID: z.string().uuid()
    });

    const { content, postID } = createBodySchema.parse(request.body);
    const userID = request.user.decodedToken;
    
    const prismaCommentsRepository = new PrismaCommentsRepository();
    const createCommentUseCase = new CreateCommentUseCase(prismaCommentsRepository);

    const prismaPostsRepository = new PrismaPostsRepository();
    const prismaUsersRepository = new PrismaUsersRepository();

    try {
        await createCommentUseCase.execute({
            content: content,
            userID: userID,
            postID: postID
        });
    } catch (error) { throw error };

    const originalPost = await prismaPostsRepository.findByID(postID);

    if (!originalPost) {
        throw new ResourceNotFoundError();
    }

    const postOwner = await prismaUsersRepository.findByID(originalPost.userID);

    if (!postOwner) {
      throw new ResourceNotFoundError();
    }

    await sendNewCommentEmail(postOwner.email, postOwner.name);

    return reply.status(201).send('Comentário criado com sucesso');
}
