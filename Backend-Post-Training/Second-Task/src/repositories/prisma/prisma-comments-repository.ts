import { Comment, Like, Prisma } from "@prisma/client";
import { CommentsRepository, commentUpdateData, GetAllCommentsData } from "../comment-repository";
import { prismaClient } from "src/lib/prisma";

export class PrismaCommentsRepository implements CommentsRepository {
  async create(
    commentData: Prisma.CommentUncheckedCreateInput
  ): Promise<Comment> {
    const comment = await prismaClient.comment.create({
      data: commentData,
    });

    return comment;
  }

  async getAll(getAllCommentsData: GetAllCommentsData): Promise<Comment[]> {
    return await prismaClient.comment.findMany({
      where: {
        deletedAt: null,
      },
      take: getAllCommentsData.limit,
      skip: (getAllCommentsData.page - 1) * getAllCommentsData.limit,
    });
  }

  async getQuantity(): Promise<number> {
    return await prismaClient.comment.count({
      where: {
        deletedAt: null
      }
    });
  }

  async findByID(commentID: string): Promise<Comment | null> {
    const comment = await prismaClient.comment.findUnique({
      where: {
        id: commentID,
        deletedAt: null,
      },
    });

    return comment;
  }

  async delete(commentID: string): Promise<Comment | null> {
    const deletedComment = await prismaClient.comment.update({
      where: {
        id: commentID,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return deletedComment;
  }

  async update(
    commentID: string,
    updateData: commentUpdateData
  ): Promise<Comment | null> {
    const updatedComment = await prismaClient.comment.update({
      where: { id: commentID },
      data: {
        content: updateData.content,
      },
    });

    return updatedComment;
  }

  async getLikes(commentID: string): Promise<Like[]> {
    const allLikes = await prismaClient.like.findMany({
      where: {
        commentID: commentID,
      },
    });

    return allLikes;
  }

  async removeDeletedComments(): Promise<void> {
    await prismaClient.comment.deleteMany({
      where: {
        deletedAt: { not: null },
      },
    });
  }

  async getMostCommentedPosts(
    limit: number = 10,
    page: number = 1
  ): Promise<(string | number)[][]> {
    const topPostComments = await prismaClient.comment.groupBy({
      by: ["postID"],
      _count: { postID: true },
      orderBy: {
        _count: { postID: "desc" },
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    const postIDs = topPostComments.map((comment) => {
      if (comment.postID) return [comment.postID, comment._count.postID];
    });

    const filteredComments = postIDs.filter((comment) => !!comment);

    return filteredComments;
  }
}
