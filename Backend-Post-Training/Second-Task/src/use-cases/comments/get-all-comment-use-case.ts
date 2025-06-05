import { Comment } from "@prisma/client";
import { CommentsRepository } from "src/repositories/comment-repository";

interface GetAllCommentsUseCaseRequest {
  page: number;
  limit: number;
}

interface GetAllCommentsUseCaseResponse {
  comments: Comment[];
  quantity: number;
}

export class GetAllCommentsUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute(
    getAllCommentsInputData: GetAllCommentsUseCaseRequest
  ): Promise<GetAllCommentsUseCaseResponse> {
    return {
      comments: await this.commentsRepository.getAll(getAllCommentsInputData),
      quantity: await this.commentsRepository.getQuantity(),
    };
  }
}
