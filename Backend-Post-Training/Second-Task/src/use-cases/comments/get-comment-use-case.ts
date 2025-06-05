import { Comment } from "@prisma/client";
import { CommentsRepository } from "src/repositories/comment-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetCommentUseCaseRequest {
    commentID: string
}

interface GetCommentUseCaseResponse {
    comment: Comment
}

export class GetCommentUseCase {
    constructor(private commentsRepository: CommentsRepository) {}

    async execute({ commentID }: GetCommentUseCaseRequest): Promise<Comment | null> {
        const comment = await this.commentsRepository.findByID(commentID);

        if (!comment) {
            throw new ResourceNotFoundError();
        }

        return comment;
    }
}
