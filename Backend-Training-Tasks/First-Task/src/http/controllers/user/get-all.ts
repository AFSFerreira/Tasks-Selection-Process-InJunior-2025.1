import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { GetAllUsersUseCase } from "src/use-cases/users/get-all-user-use-case";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const getAllUserUseCase = new GetAllUsersUseCase(prismaUsersRepository);

        const allUsers = await getAllUserUseCase.execute();

        return reply.status(200).send({ users: allUsers })
    } catch (error) {
        throw error;
    }
};
