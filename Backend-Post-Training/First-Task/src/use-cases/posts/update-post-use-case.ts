import { Post } from "@prisma/client";
import { PostsRepository, PostUpdateInput } from "src/repositories/posts-repository";
import { ResourceNotFoundError } from "../comments/errors/resource-not-found-error";

interface UpdatePostUseCaseRequest {
    postID: string,
    postUpdateData: PostUpdateInput
}

interface UpdatePostUseCaseResponse {
    post: Post
}

export class UpdatePostUseCase {
    constructor(private postsRepository: PostsRepository) { }

    async execute({ postID, postUpdateData }: UpdatePostUseCaseRequest): Promise<Post | null> {
        const post = await this.postsRepository.findByID(postID);

        if (!post) {
            throw new ResourceNotFoundError();
        }

        const postUpdated = await this.postsRepository.update(postID, postUpdateData);

        if (!postUpdated) {
            throw new ResourceNotFoundError();
        }

        return postUpdated;
    }
}
