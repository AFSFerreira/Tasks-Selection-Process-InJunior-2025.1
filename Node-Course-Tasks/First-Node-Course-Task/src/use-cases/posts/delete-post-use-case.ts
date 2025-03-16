import { Post } from "@prisma/client";
import { PostsRepository } from "src/repositories/posts-repository";

interface DeletePostUseCaseRequest {
    postID: string
}

interface DeletePostUseCaseResponse {
    post: Post | null
}

export class DeletePostUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({ postID }: DeletePostUseCaseRequest): Promise<Post | null> {
        const postDeleted = await this.postsRepository.delete(postID);
        return postDeleted;
    }
}
