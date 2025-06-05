import { Comment } from "@prisma/client";
import { CommentsRepository } from "src/repositories/comment-repository";

interface CreateCommentUseCaseRequest {
    content: string,
    userID: string,
    postID: string
}

interface CreateCommentUseCaseResponse {
    comment: Comment
}

export class CreateCommentUseCase {
    constructor(private commentsRepository: CommentsRepository) {}

    async execute({ content, userID, postID }: CreateCommentUseCaseRequest): Promise<Comment> {
        const comment = await this.commentsRepository.create({
            content: content,
            userID: userID,
            postID: postID
        });

        return comment;
    }
}
