import { Post } from "@prisma/client";
import { PostsRepository } from "src/repositories/posts-repository";

interface CreatePostUseCaseRequest {
    title: string,
    content: string,
    userID: string
}

interface CreatePostUseCaseResponse {
    post: Post
}

export class CreatePostUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({ title, content, userID }: CreatePostUseCaseRequest): Promise<Post> {
        const postCreated = await this.postsRepository.create({
            title: title,
            content: content,
            userID: userID
        });

        return postCreated;
    }
}
