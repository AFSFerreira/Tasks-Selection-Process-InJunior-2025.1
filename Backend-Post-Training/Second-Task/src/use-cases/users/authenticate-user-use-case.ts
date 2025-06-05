import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { UsersRepository } from "src/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
    email: string,
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const userFound = await this.usersRepository.findByEmail(email);

        if (!userFound) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await compare(password, userFound.password);

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return { user: userFound } as AuthenticateUseCaseResponse;
    }
}
