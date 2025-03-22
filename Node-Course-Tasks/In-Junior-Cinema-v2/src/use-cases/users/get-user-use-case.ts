import { User } from "@prisma/client";
import { UsersRepository } from "src/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserUseCaseRequest {
    userID: string
}

interface GetUserUseCaseResponse {
    user: User
}

export class GetUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userID }: GetUserUseCaseRequest): Promise<User | null> {
        const user = await this.usersRepository.findByID(userID);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        return user;
    }
}
