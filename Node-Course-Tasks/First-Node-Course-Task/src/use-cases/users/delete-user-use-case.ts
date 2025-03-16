import { User } from "@prisma/client";
import { UsersRepository } from "src/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteUserUseCaseRequest {
    userID: string
}

interface DeleteUserUseCaseResponse {
    user: User
}

export class DeleteUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userID }: DeleteUserUseCaseRequest): Promise<User | null> {
        const userDeleted = await this.usersRepository.delete(userID);

        if (!userDeleted) {
            throw new ResourceNotFoundError();
        }

        return userDeleted;
    }
}
