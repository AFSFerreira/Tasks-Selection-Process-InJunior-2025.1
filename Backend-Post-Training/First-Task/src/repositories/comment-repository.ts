import { Comment, Like, Prisma } from "@prisma/client";

interface commentUpdateData {
    content: string
}

export interface GetAllCommentsData {
  page: number;
  limit: number;
}

interface CommentsRepository {
    getAll(getAllCommentsData: GetAllCommentsData): Promise<Comment[]>;
    getQuantity(): Promise<number>;
    findByID(commentID: string): Promise<Comment | null>;
    create(commentData: Prisma.CommentUncheckedCreateInput): Promise<Comment>;
    delete(commentID: string): Promise<Comment | null>;
    update(commentID: string, updateData: commentUpdateData): Promise<Comment | null>;
    getLikes(commentID: string): Promise<Like[]>;
    removeDeletedComments(): Promise<void>;
    getMostCommentedPosts(limit?: number, page?: number): Promise<(string | number)[][]>;
}

export { CommentsRepository, commentUpdateData };
