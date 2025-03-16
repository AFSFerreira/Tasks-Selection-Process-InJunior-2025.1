import { Comment, Like, Post, Prisma } from "@prisma/client";

interface PostUpdateInput {
    title?: string
    content?: string
}

interface PostsRepository {
    getAll(): Promise<Post[]>;
    create(postData: Prisma.PostUncheckedCreateInput): Promise<Post>;
    findByID(postID: string): Promise<Post | null>;
    delete(postID: string): Promise<Post | null>;
    update(postID: string, updateData: PostUpdateInput): Promise<Post | null>;
    getPostsByUser(userID: string): Promise<Post[]>;
    getLikes(postID: string): Promise<Like[]>;
    getComments(postID: string): Promise<Comment[]>;
}

export { PostsRepository, PostUpdateInput };
