import { Like, Post } from "@prisma/client";
import { LikesRepository } from "src/repositories/likes-repository";
import { PostsRepository } from "src/repositories/posts-repository";

interface GetMostLikedPostsRequest {}

interface GetMostLikedPostsResponse {
  likes: Like[];
}

export class GetMostLikedPosts {
  constructor(
    private postsRepository: PostsRepository,
    private likesRepository: LikesRepository
  ) {}

  async execute({}: GetMostLikedPostsRequest): Promise<Post[]> {
    const mostLikedPostIDs = await this.likesRepository.getMostLikedPostIDs(3);
    const mostLikedPosts = await this.postsRepository.findManyByID(
      mostLikedPostIDs.map(like => like[0]) as string[]
    );

    return mostLikedPosts;
  }
}
