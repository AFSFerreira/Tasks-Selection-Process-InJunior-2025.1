import { Comment, Like, Post, Prisma, User } from "@prisma/client";
import { UsersRepository, UserUpdateInput } from "../users-repository";
import { prismaClient } from "src/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
    async create(userData: Prisma.UserCreateInput): Promise<User> {
        const user = await prismaClient.user.create({
            data: userData
        });

        return user;
    };

    async getAll(): Promise<User[]> {
        return await prismaClient.user.findMany();
    };

    async delete(userID: string): Promise<User | null> {
        const deletedUser = await prismaClient.user.delete({
            where: {
                id: userID
            }
        });

        return deletedUser;
    };

    async findByEmail(userEmail: string): Promise<User | null> {
        const user = await prismaClient.user.findUnique({
            where: {
                email: userEmail
            }
        })
        
        return user;
    };

    async findByID(userID: string): Promise<User | null> {
        const user = await prismaClient.user.findUnique({
            where: {
                id: userID
            }
        });

        return user;
    };

    async update(userID: string, updateData: UserUpdateInput): Promise<User | null> {
        const updatedUser = await prismaClient.user.update({
            where: { id: userID },
            data: {
                name: updateData.name,
                email: updateData.email,
                password: updateData.password,
                image: updateData.image
            }
        });

        return updatedUser;
    };

    async getPosts(userID: string): Promise<Post[]> {
        const allPosts = await prismaClient.post.findMany({
            where: {
                userID: userID
            }
        });

        return allPosts;
    };

    async getLikes(userID: string): Promise<Like[]> {
        const allLikes = await prismaClient.like.findMany({
            where: {
                userID: userID
            }
        });

        return allLikes;
    };

    async getComments(userID: string): Promise<Comment[]> {
        const allComments = await prismaClient.comment.findMany({
            where: {
                userID: userID
            }
        });

        return allComments;
    };
}
