import { Like } from "@prisma/client";
import { CommentsRepository } from "src/repositories/comment-repository";

interface GetAllLikesUseCaseRequest {
    commentID: string
}

interface GetAllLikesUseCaseResponse {
    likes: Like[]
}

export class GetAllLikesUseCase {
    constructor(private commentsRepository: CommentsRepository) {}

    async execute({ commentID }: GetAllLikesUseCaseRequest): Promise<Like[]> {
        const allLikes = await this.commentsRepository.getLikes(commentID);
        return allLikes;
    }
}
