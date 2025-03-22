import { User } from "@prisma/client";
import { UsersRepository } from "src/repositories/users-repository";

interface GetAllUserUseCaseResponse {
    users: User[]
}

export class GetAllUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute(): Promise<GetAllUserUseCaseResponse> {
        const allUsers = await this.usersRepository.getAll();

        return { users: allUsers } as GetAllUserUseCaseResponse;
    }
}
