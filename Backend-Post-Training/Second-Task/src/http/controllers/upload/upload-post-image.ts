import { FastifyReply, FastifyRequest } from "fastify";
import { PostImageDataCreateInput } from "src/repositories/post-image-repository";
import { PrismaPostImageRepository } from "src/repositories/prisma/prisma-post-image-repository.";
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-posts-repository";
import { CreatePostImagesUseCase } from "src/use-cases/postImages/create-post-images-use-case";
import { CreatePostUseCase } from "src/use-cases/posts/create-post-use-case";

export async function uploadPostPics(request: FastifyRequest, reply: FastifyReply) {
  const postPics = request.files;
  const userID = request.user.decodedToken;

  const requestData = {
    postID: request.params["postID"],
    PostImageData: [],
  } as PostImageDataCreateInput;

  for await (const file of postPics) {
    requestData.PostImageData.push({
      size: file.size,
      data: file.buffer,
    });
  }

  try {
    const prismaPostImageRepository = new PrismaPostImageRepository();
    const createPostImagesUseCase = new CreatePostImagesUseCase(
      prismaPostImageRepository
    );

    await createPostImagesUseCase.execute(requestData);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Failed to upload post images." });
  }

  reply.status(201).send({ message: "Post images uploaded successfully." });
}
