import { Comment, Like, Prisma } from "@prisma/client";

interface commentUpdateData {
    content: string
}

interface CommentsRepository {
    getAll(): Promise<Comment[]>;
    findByID(commentID: string): Promise<Comment | null>;
    create(commentData: Prisma.CommentUncheckedCreateInput): Promise<Comment>;
    delete(commentID: string): Promise<Comment | null>;
    update(commentID: string, updateData: commentUpdateData): Promise<Comment | null>;
    getLikes(commentID: string): Promise<Like[]>;
}

export { CommentsRepository, commentUpdateData };
