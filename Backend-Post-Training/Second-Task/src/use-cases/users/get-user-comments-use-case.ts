import { Comment } from "@prisma/client"
import { UsersRepository } from "src/repositories/users-repository"

interface GetUserCommentsUseCaseRequest {
    userID: string
}

interface GetUserCommentsUseCaseResponse {
    comments: Comment[]
}

export class GetUserCommentsUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userID }: GetUserCommentsUseCaseRequest): Promise<Comment[]> {
        const allComments = await this.usersRepository.getComments(userID);
        return allComments;
    }
}
