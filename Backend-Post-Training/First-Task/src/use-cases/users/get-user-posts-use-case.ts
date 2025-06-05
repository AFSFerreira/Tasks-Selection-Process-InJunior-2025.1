import { Post } from "@prisma/client";
import { UsersRepository } from "src/repositories/users-repository";

interface GetUserPostsUseCaseRequest {
    userID: string
}

interface GetUserPostsUseCaseResponse {
    userPosts: Post[]
}

export class GetUserPostsUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userID }: GetUserPostsUseCaseRequest): Promise<Post[]> {
        const userPosts = await this.usersRepository.getPosts(userID);
        return userPosts;
    }
}
