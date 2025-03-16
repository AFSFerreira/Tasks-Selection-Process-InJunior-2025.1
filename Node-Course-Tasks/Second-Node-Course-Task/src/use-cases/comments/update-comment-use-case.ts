import { Comment } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CommentsRepository, commentUpdateData } from "src/repositories/comment-repository";

interface UpdateCommentUseCaseRequest {
    commentID: string,
    commentUpdateData: commentUpdateData
}

interface UpdateCommentUseCaseResponse {
    comment: Comment
}

export class UpdateCommentUseCase {
    constructor(private commentsRepository: CommentsRepository) {}

    async execute({ commentID, commentUpdateData }: UpdateCommentUseCaseRequest): Promise<Comment | null> {
        const comment = await this.commentsRepository.findByID(commentID);

        if (!comment) {
            throw new ResourceNotFoundError();
        }

        const updatedComment = await this.commentsRepository.update(commentID, commentUpdateData);

        if (!updatedComment) {
            throw new ResourceNotFoundError();
        }

        return updatedComment;
    }
}
