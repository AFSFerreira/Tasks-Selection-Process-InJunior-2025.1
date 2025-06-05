import { Comment, Like, Post, Prisma } from "@prisma/client";

interface PostUpdateInput {
    title?: string
    content?: string
}

export type getAllPostsData = {
  page: number;
  limit: number;

  title?: string;
  content?: string;
  orderBy?: "LIKE" | "COMMENT" | "LATEST";
};

interface PostsRepository {
  getAll(getAllPostsData: getAllPostsData): Promise<Post[]>;
  getQuantity(getAllPostsData: getAllPostsData): Promise<number>;
  create(postData: Prisma.PostUncheckedCreateInput): Promise<Post>;
  findByID(postID: string): Promise<Post | null>;
  findManyByID(postIDs: string[]): Promise<Post[]>;
  delete(postID: string): Promise<Post | null>;
  update(postID: string, updateData: PostUpdateInput): Promise<Post | null>;
  getPostsByUser(userID: string): Promise<Post[]>;
  getLikes(postID: string): Promise<Like[]>;
  getComments(postID: string): Promise<Comment[]>;
  removeDeletedPosts(): Promise<void>;
}

export { PostsRepository, PostUpdateInput };
