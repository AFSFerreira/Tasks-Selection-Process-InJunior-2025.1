import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "src/use-cases/users/errors/user-already-exists-error";
import { RegisterUserUseCase } from "src/use-cases/users/register-user-use-case";
import { z } from "zod";
import { sendWelcomeEmail } from "src/emails/email-service";


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        image: z.string()
    });

    const { name, email, password, image } = registerBodySchema.parse(request.body);

    let userCreated;

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const registerUseCase = new RegisterUserUseCase(prismaUsersRepository);

        userCreated = await registerUseCase.execute({
            name,
            email,
            password,
            image
        });
    } catch(error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message });
        }
        throw error;
    }

    await sendWelcomeEmail(email, name);

    reply.status(201).send('Usuário criado com sucesso');
}
