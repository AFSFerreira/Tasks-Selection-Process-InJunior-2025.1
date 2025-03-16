import { Like } from "@prisma/client";
import { LikesRepository } from "src/repositories/likes-repository";
import { LikeAlreadyExistsError } from "./errors/like-already-exists-error";

interface CreateLikeUseCaseRequest {
    userID: string,
    postID?: string,
    commentID?: string
}

interface CreateLikeUseCaseResponse {
    like: Like
}

export class CreateLikeUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({ userID, postID, commentID }: CreateLikeUseCaseRequest): Promise<Like> {
        const likeAlreadyExists = await this.likesRepository.checkLikeAlreadyExists({ userID, postID, commentID });
        if (likeAlreadyExists) {
            throw new LikeAlreadyExistsError();
        }
        
        const likeCreated = await this.likesRepository.create({
            userID: userID,
            postID: postID,
            commentID: commentID
        });

        return likeCreated;
    }
}
