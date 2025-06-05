import { User } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { env } from "src/env";
import { UsersRepository, UserUpdateInput } from "src/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface UpdateUserUseCaseRequest {
    userID: string,
    userUpdateData: UserUpdateInput
}

interface UpdateUserUseCaseResponse {
    user: User
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userID, userUpdateData }: UpdateUserUseCaseRequest): Promise<User | null> {
        const user = await this.usersRepository.findByID(userID);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        if (userUpdateData.password) {
            const isSamePassword = await compare(user.password, userUpdateData.password);

            if (isSamePassword) {
                throw new Error('As senhas devem ser diferentes');
            }

            userUpdateData.password = await hash(userUpdateData.password, env.HASH_NUMBER_TIMES);
        }

        const userUpdated = await this.usersRepository.update(userID, userUpdateData);

        if (!userUpdated) {
            throw new ResourceNotFoundError();
        }

        return userUpdated;
        
    }
}
