import { Post } from "@prisma/client";
import { PostsRepository } from "src/repositories/posts-repository";
import { ResourceNotFoundError } from "../comments/errors/resource-not-found-error";

interface GetPostUseCaseRequest {
    postID: string
}

interface GetPostUseCaseResponse {
    post: Post
}

export class GetPostUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({ postID }: GetPostUseCaseRequest): Promise<Post | null> {
        const post = await this.postsRepository.findByID(postID);

        if (!post) {
            throw new ResourceNotFoundError();
        }

        return post;
    }
}
