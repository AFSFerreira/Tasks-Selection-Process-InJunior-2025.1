import { prismaClient } from "src/lib/prisma";
import { CheckLikeInput, LikesRepository } from "../likes-repository";
import { Like, Prisma, PrismaClient } from "@prisma/client";

export class PrismaLikesRepository implements LikesRepository {
    async create(likeData: Prisma.LikeUncheckedCreateInput): Promise<Like> {
        const like = await prismaClient.like.create({
            data: likeData
        });

        return like;
    };

    async checkLikeAlreadyExists(likeData: CheckLikeInput): Promise<Boolean> {
        const likeAlreadyExists = await prismaClient.like.findFirst({
            where: {
                userID: likeData.userID,
                commentID: likeData.commentID,
                postID: likeData.postID
            }
        });

        return !!likeAlreadyExists;
    }

    async delete(likeID: string): Promise<Like | null> {
        const deletedLike = await prismaClient.like.delete({
            where: {
                id: likeID
            }
        });

        return deletedLike;
    };

    async findByID(likeID: string): Promise<Like | null> {
        const like = await prismaClient.like.findUnique({
            where: {
                id: likeID
            }
        });

        return like;
    };
}
