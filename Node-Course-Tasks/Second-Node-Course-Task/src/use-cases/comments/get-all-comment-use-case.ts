import { Comment } from "@prisma/client";
import { CommentsRepository } from "src/repositories/comment-repository";

interface GetAllCommentsUseCaseResponse {
    comments: Comment[]
}

export class GetAllCommentsUseCase {
    constructor(private commentsRepository: CommentsRepository) {}

    async execute(): Promise<Comment[]> {
        const allComments = await this.commentsRepository.getAll();
        return allComments;
    }
}
