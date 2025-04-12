import { Like, Prisma } from "@prisma/client";

interface CheckLikeInput {
    userID: string,
    postID?: string,
    commentID?: string
}

interface LikesRepository {
  create(likeData: Prisma.LikeUncheckedCreateInput): Promise<Like>;
  delete(likeID: string): Promise<Like | null>;
  findByID(likeID: string): Promise<Like | null>;
  checkLikeAlreadyExists(likeData: CheckLikeInput): Promise<Boolean>;
  getMostLikedPostIDs(
    limit?: number,
    page?: number
  ): Promise<(string | number)[][]>;
}

export { LikesRepository, CheckLikeInput };
