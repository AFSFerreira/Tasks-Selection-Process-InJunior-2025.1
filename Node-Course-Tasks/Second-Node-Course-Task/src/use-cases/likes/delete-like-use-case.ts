import { Like } from "@prisma/client";
import { LikesRepository } from "src/repositories/likes-repository";

interface DeleteLikeUseCaseRequest {
    likeID: string
}

interface DeleteLikeUseCaseResponse {
    like: Like | null
}

export class DeleteLikeUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({ likeID }: DeleteLikeUseCaseRequest): Promise<Like | null> {
        const deletedLike = await this.likesRepository.delete(likeID);
        return deletedLike;
    }
}
