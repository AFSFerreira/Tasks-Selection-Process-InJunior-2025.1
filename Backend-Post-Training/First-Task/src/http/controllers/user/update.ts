import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "src/use-cases/users/errors/resource-not-found-error";
import { UpdateUserUseCase } from "src/use-cases/users/update-user-use-case";
import { z } from 'zod';

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateBodySchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).optional(),
        image: z.string().optional()
    });

    const userID = request.user.decodedToken;

    const { name, email, password, image } = updateBodySchema.parse(request.body);

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository);

        const user = await updateUserUseCase.execute({
            userID: userID,
            userUpdateData: {
                name: name,
                email: email,
                password: password,
                image: image
            }
        });

        return reply.status(200).send({ user: user })
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
        throw error;
    }
};
