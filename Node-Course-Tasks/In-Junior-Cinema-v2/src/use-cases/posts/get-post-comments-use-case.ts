import { Comment } from "@prisma/client";
import { PostsRepository } from "src/repositories/posts-repository";

interface GetAllCommentUseCaseRequest {
    postID: string
}

interface GetAllCommentUseCaseResponse {
    comments: Comment[]
}

export class GetAllCommentUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({ postID }: GetAllCommentUseCaseRequest): Promise<Comment[]> {
        const allComments = await this.postsRepository.getComments(postID);
        return allComments;
    }
}
