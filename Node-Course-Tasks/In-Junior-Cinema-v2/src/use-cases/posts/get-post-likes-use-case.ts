import { Like } from "@prisma/client";
import { PostsRepository } from "src/repositories/posts-repository";

interface GetAllLikeUseCaseRequest {
    postID: string
}

interface GetAllLikeUseCaseResponse {
    likes: Like[]
}

export class GetAllLikeUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({ postID }: GetAllLikeUseCaseRequest): Promise<Like[]> {
        const allLikes = await this.postsRepository.getLikes(postID);
        return allLikes;
    }
}
