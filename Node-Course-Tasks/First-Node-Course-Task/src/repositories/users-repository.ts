import { Prisma, User, Post } from '@prisma/client';

interface UserUpdateInput {
    name?: string
    email?: string
    password?: string
    image?: string
}

interface UsersRepository {
    getAll(): Promise<User[]>;
    create(userData: Prisma.UserCreateInput): Promise<User>;
    delete(userID: string): Promise<User | null>;
    findByEmail(userEmail: string): Promise<User | null>;
    findByID(userID: string): Promise<User | null>;
    update(userID: string, updateData: UserUpdateInput): Promise<User | null>;
    getPosts(userID: string): Promise<Post[]>;
}

export { UsersRepository, UserUpdateInput };
