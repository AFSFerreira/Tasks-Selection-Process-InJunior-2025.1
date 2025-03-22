import { CommentsRepository } from "src/repositories/comment-repository";
import { Comment } from "@prisma/client";

interface DeleteCommentUseCaseRequest {
    commentID: string
}

interface DeleteCommentUseCaseResponse {
    comment: Comment | null 
}

export class DeleteCommentUseCase {
    constructor(private commentsRepository: CommentsRepository) {}

    async execute({ commentID }: DeleteCommentUseCaseRequest): Promise<Comment | null> {
        const deletedComment = await this.commentsRepository.delete(commentID);
        return deletedComment;
    }
}
