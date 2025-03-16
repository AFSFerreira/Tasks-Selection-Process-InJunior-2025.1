import { Post } from "@prisma/client";
import { PostsRepository } from "src/repositories/posts-repository";

interface GetPostByUserUseCaseRequest {
    userID: string
}

export interface GetPostByUserUseCaseResponse {
    posts: Post[]
}

export class GetPostByUserUseCase {
    constructor(private postsRepository: PostsRepository) { }

    async execute({ userID }: GetPostByUserUseCaseRequest): Promise<Post[]> {
        const allUserPosts = await this.postsRepository.getPostsByUser(userID);
        return allUserPosts;
    }
}
