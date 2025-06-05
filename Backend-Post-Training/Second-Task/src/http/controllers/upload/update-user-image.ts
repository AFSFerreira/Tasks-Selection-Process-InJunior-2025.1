import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUserImageRepository } from "src/repositories/prisma/prisma-user-image-repository";
import { UpdateUserImageUseCase } from "src/use-cases/userImages/update-user-image-use-case";

export async function updateUserImage(request: FastifyRequest, reply: FastifyReply) {
  const userImage = request.file;
  const userID = request.user.decodedToken;

  if (!userImage) {
    return reply.status(400).send({ message: "No image file provided." });
  }

  const updateUserImageData = {
    userID: userID,
    size: userImage.size,
    data: userImage.buffer,
  };

  try {
    const prismaUserImageRepository = new PrismaUserImageRepository();
    const updateUserImageUseCase = new UpdateUserImageUseCase(prismaUserImageRepository);

    await updateUserImageUseCase.execute(updateUserImageData);

    reply.status(200).send({ message: "User image updated successfully." });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Failed to update user image." });
  }
}
