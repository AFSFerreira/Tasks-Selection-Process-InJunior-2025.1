import { Like } from "@prisma/client"
import { UsersRepository } from "src/repositories/users-repository"

interface GetUserLikesUseCaseRequest {
    userID: string
}

interface GetUserLikesUseCaseResponse {
    likes: Like[]
}

export class GetUserLikesUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userID }: GetUserLikesUseCaseRequest): Promise<Like[]> {
        const allLikes = await this.usersRepository.getLikes(userID);
        return allLikes;
    }
}
