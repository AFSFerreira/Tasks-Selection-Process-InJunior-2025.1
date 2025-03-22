import { Post, Prisma } from "@prisma/client";

interface PostUpdateInput {
    title?: string
    content?: string
}

interface PostsRepository {
    create(postData: Prisma.PostUncheckedCreateInput): Promise<Post>;
    getAll(): Promise<Post[]>;
    findByID(postID: string): Promise<Post | null>;
    delete(postID: string): Promise<Post | null>;
    update(postID: string, updateData: PostUpdateInput): Promise<Post | null>;
    getPostsByUser(userID: string): Promise<Post[]>;
}

export { PostsRepository, PostUpdateInput };
