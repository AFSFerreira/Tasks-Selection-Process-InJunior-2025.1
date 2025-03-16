import { Like } from "@prisma/client";
import { LikesRepository } from "src/repositories/likes-repository";

interface GetLikeUseCaseRequest {
    likeID: string
}

interface GetLikeUseCaseResponse {
    like: Like
}

export class GetLikeUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({ likeID }: GetLikeUseCaseRequest): Promise<Like | null> {
        const like = await this.likesRepository.findByID(likeID);
        return like;
    }
}
