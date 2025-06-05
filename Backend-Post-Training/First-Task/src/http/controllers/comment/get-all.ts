import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaCommentsRepository } from "src/repositories/prisma/prisma-comments-repository";
import { GetAllCommentsUseCase } from "src/use-cases/comments/get-all-comment-use-case";
import { z } from "zod";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  const getAllComentsQuerySchema = z.object({
    page: z.coerce
      .number()
      .int("Page must be an integer")
      .positive("Page must be a positive number")
      .optional()
      .default(1),

    limit: z.coerce
      .number()
      .int("PerPage must be an integer")
      .positive("PerPage must be a positive number")
      .optional()
      .default(10),
  });

  const queryProps = getAllComentsQuerySchema.parse(request.query);

  try {
    const prismaCommentsRepository = new PrismaCommentsRepository();
    const getAllCommentUseCase = new GetAllCommentsUseCase(
      prismaCommentsRepository
    );

    const getAllCommentsResponse = await getAllCommentUseCase.execute(
      queryProps
    );

    const responseMetaParams = {
      currentPage: queryProps.page,
      perPage: queryProps.limit,
      totalItems: getAllCommentsResponse.quantity,
      totalPages: Math.ceil(getAllCommentsResponse.quantity / queryProps.limit),
    };

    return reply.status(200).send({
      data: getAllCommentsResponse.comments,
      meta: responseMetaParams,
    });
  } catch (error) {
    throw error;
  }
}
