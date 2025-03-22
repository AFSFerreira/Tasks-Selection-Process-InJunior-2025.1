import { Comment, Like, Prisma } from "@prisma/client";
import { CommentsRepository, commentUpdateData } from "../comment-repository";
import { prismaClient } from "src/lib/prisma";

export class PrismaCommentsRepository implements CommentsRepository {
    async create(commentData: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
        const comment = await prismaClient.comment.create({
            data: commentData
        });

        return comment;
    };

    async getAll(): Promise<Comment[]> { return await prismaClient.comment.findMany() }

    async findByID(commentID: string): Promise<Comment | null> {
        const comment = await prismaClient.comment.findUnique({
            where: {
                id: commentID
            }
        });

        return comment;
    };

    async delete(commentID: string): Promise<Comment | null> {
        const deletedComment = await prismaClient.comment.delete({
            where: {
                id: commentID
            }
        });

        return deletedComment;
    };

    async update(commentID: string, updateData: commentUpdateData): Promise<Comment | null> {
        const updatedComment = await prismaClient.comment.update({
            where: { id: commentID },
            data: {
                content: updateData.content
            }
        });

        return updatedComment;
    };

    async getLikes(commentID: string): Promise<Like[]> {
        const allLikes = await prismaClient.like.findMany({
            where: {
                commentID: commentID 
            }
        });

        return allLikes;
    };
}
