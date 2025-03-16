import { Post } from "@prisma/client";
import { PostsRepository } from "src/repositories/posts-repository";

interface GetAllPostUseCaseResponse {
    posts: Post[]
}

export class GetAllPostUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute(): Promise<Post[]> {
        const allPosts = await this.postsRepository.getAll();
        return allPosts;
    }
}
