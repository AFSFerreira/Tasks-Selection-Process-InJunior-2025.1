import { hash } from "bcryptjs";
import { env } from "src/env";
import { UsersRepository } from "src/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUserUseCaseRequest {
    name: string,
    email: string,
    password: string,
    image: string
}

export class RegisterUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password, image }: RegisterUserUseCaseRequest) {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new UserAlreadyExistsError();
        }

        const passwordHash = await hash(password, env.HASH_NUMBER_TIMES);

        await this.usersRepository.create({
            name: name,
            email: email,
            password: passwordHash,
            image: image
        });
    }
}
