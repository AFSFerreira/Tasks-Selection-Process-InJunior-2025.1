import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaCommentsRepository } from "src/repositories/prisma/prisma-comments-repository";
import { PrismaLikesRepository } from "src/repositories/prisma/prisma-likes-repository";
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-posts-repository";
import {
  GetAllPostUseCase,
  GetAllPostUseCaseRequest,
} from "src/use-cases/posts/get-all-posts-use-case";
import { z } from "zod";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  const getAllPostsQuerySchema = z.object({
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

    title: z.string().nonempty().optional(),

    content: z.string().nonempty().optional(),

    orderBy: z.enum(["LIKE", "COMMENT", "LATEST"]).optional(),
  });

  const queryProps = getAllPostsQuerySchema.parse(request.query);

  const arrayFilteredQueryProps = Object.entries(queryProps).map(
    ([key, value]) => {
      return [key, typeof value === "string" ? value.trim() : value];
    }
  );

  const filteredQueryProps = Object.fromEntries(
    arrayFilteredQueryProps
  ) as GetAllPostUseCaseRequest;

  try {
    const prismaPostsRepository = new PrismaPostsRepository();
    const getAllPostsUseCase = new GetAllPostUseCase(prismaPostsRepository);

    const getAllPostsResponse = await getAllPostsUseCase.execute(
      filteredQueryProps
    );

    const responseMetaParams = {
      currentPage: queryProps.page,
      perPage: queryProps.limit,
      totalItems: getAllPostsResponse.quantity,
      totalPages: Math.ceil(getAllPostsResponse.quantity / queryProps.limit),
    };

    return reply
      .status(200)
      .send({ data: getAllPostsResponse.posts, meta: responseMetaParams });
  } catch (error) {
    throw error;
  }
}
