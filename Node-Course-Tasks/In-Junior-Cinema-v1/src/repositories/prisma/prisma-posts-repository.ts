import { Post, Prisma } from "@prisma/client";
import { PostsRepository, PostUpdateInput } from "../posts-repository";
import { prismaClient } from "src/lib/prisma";

export class PrismaPostsRepository implements PostsRepository {
    async create(postData: Prisma.PostUncheckedCreateInput): Promise<Post> {
        const post = await prismaClient.post.create({
            data: postData
        });

        return post;
    };
    
    async findByID(postID: string): Promise<Post | null> {
        const post = await prismaClient.post.findUnique({
            where: {
                id: postID
            }
        });
        
        return post;
    };

    async delete(postID: string): Promise<Post | null> {
        const deletedPost = await prismaClient.post.delete({
            where: {
                id: postID
            }
        });
        
        return deletedPost;
    };
    
    async update(postID: string, updateData: PostUpdateInput): Promise<Post | null> {
        const updatedPost = await prismaClient.post.update({
            where: { id: postID },
            data: {
                title: updateData.title,
                content: updateData.content
            }
        });

        return updatedPost;
    };
    
    async getAll(): Promise<Post[]> { return await prismaClient.post.findMany() };

    async getPostsByUser(userID: string): Promise<Post[]> {
        const allUserPosts = await prismaClient.post.findMany({
            where: {
                userID: userID
            }
        });

        return allUserPosts;
    }
}
