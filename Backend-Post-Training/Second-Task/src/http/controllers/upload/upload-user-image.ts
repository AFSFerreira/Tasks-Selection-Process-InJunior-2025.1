import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUserImageRepository } from "src/repositories/prisma/prisma-user-image-repository";
import { CreateUserImageUseCase } from "src/use-cases/userImages/create-user-image-use-case";


export async function uploadUserImage(request: FastifyRequest, reply: FastifyReply) {
  const userImage = request.file;
  const userID = request.user.decodedToken;

  if (!userImage) {
    return reply.status(400).send({ message: "No image file provided." });
  }

  const createUserImageData = {
    userID: userID,
    size: userImage.size,
    data: userImage.buffer,
  };

  try {
    const prismaUserImageRepository = new PrismaUserImageRepository();
    const createUserImageUseCase = new CreateUserImageUseCase(prismaUserImageRepository);

    await createUserImageUseCase.execute(createUserImageData);

    reply.status(201).send({ message: "User image uploaded successfully." });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Failed to upload user image." });
  }
}
