import { Post } from "@prisma/client";
import { CommentsRepository } from "src/repositories/comment-repository";
import { LikesRepository } from "src/repositories/likes-repository";
import { PostsRepository } from "src/repositories/posts-repository";

export interface GetAllPostUseCaseRequest {
  page: number;
  limit: number;

  title?: string;
  content?: string;
  orderBy?: "LIKE" | "COMMENT" | "LATEST";
}

interface GetAllPostUseCaseResponse {
  posts: Post[];
  quantity: number;
}

export class GetAllPostUseCase {
  constructor(
    private postsRepository: PostsRepository
  ) {}

  async execute(
    getAllPajamaInputData: GetAllPostUseCaseRequest
  ): Promise<GetAllPostUseCaseResponse> {
    return {
      posts: await this.postsRepository.getAll(getAllPajamaInputData),
      quantity: await this.postsRepository.getQuantity(getAllPajamaInputData)
    }
  }
}
