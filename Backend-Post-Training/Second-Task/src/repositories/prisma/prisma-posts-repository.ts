import { Comment, Like, Post, Prisma } from "@prisma/client";
import {
  getAllPostsData,
  PostsRepository,
  PostUpdateInput,
} from "../posts-repository";
import { prismaClient } from "src/lib/prisma";

export class PrismaPostsRepository implements PostsRepository {
  async create(postData: Prisma.PostUncheckedCreateInput): Promise<Post> {
    const post = await prismaClient.post.create({
      data: postData,
    });

    return post;
  }

  async findByID(postID: string): Promise<Post | null> {
    const post = await prismaClient.post.findUnique({
      where: {
        id: postID,
        deletedAt: null,
      },
    });

    console.log(post);

    return post;
  }

  async delete(postID: string): Promise<Post | null> {
    const deletedPost = await prismaClient.post.update({
      where: {
        id: postID,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return deletedPost;
  }

  async update(
    postID: string,
    updateData: PostUpdateInput
  ): Promise<Post | null> {
    const updatedPost = await prismaClient.post.update({
      where: { id: postID },
      data: {
        title: updateData.title,
        content: updateData.content,
      },
    });

    return updatedPost;
  }

  async getAll(getAllPostsData: getAllPostsData): Promise<Post[]> {
    const { title, content, orderBy, limit, page } = getAllPostsData;

    const offset = (page - 1) * limit;

    const orderClause = orderBy
      ? {
          LIKE: "likes_count DESC",
          COMMENT: "comments_count DESC",
          LATEST: 'p."createdAt" DESC',
        }[orderBy]
      : undefined;

    const posts = await prismaClient.$queryRawUnsafe(
      `
      SELECT 
        p.*,
        COUNT(DISTINCT l."id") AS likes_count,
        COUNT(DISTINCT c."id") AS comments_count
      FROM "posts" p
      LEFT JOIN "likes" l ON l."postID" = p."id"
      LEFT JOIN "comments" c ON c."postID" = p."id"
      WHERE p."deletedAt" IS NULL
        AND (${title ? `p."title" ILIKE '%' || $1 || '%'` : "1=1"})
        AND (${content ? `p."content" ILIKE '%' || $2 || '%'` : "1=1"})
      GROUP BY p."id"
      ${orderClause ? `ORDER BY ${orderClause}` : ""}
      LIMIT $3
      OFFSET $4
    `,
      title || "",
      content || "",
      limit,
      offset
    );

    return (posts as any[]).map((post) => ({
      ...post,
      likes_count: Number(post.likes_count),
      comments_count: Number(post.comments_count),
    })) as Post[];
  }

  async getQuantity(getAllPostsData: getAllPostsData): Promise<number> {
    const { title, content } = getAllPostsData;

    const postsQuantity: Record<string, number>[] =
      await prismaClient.$queryRawUnsafe(
        `
        SELECT COUNT(*) as quantity FROM (
          SELECT p."id"
          FROM "posts" p
          LEFT JOIN "likes" l ON l."postID" = p."id"
          LEFT JOIN "comments" c ON c."postID" = p."id"
          WHERE p."deletedAt" IS NULL
            AND (${title ? `p."title" ILIKE '%' || $1 || '%'` : "1=1"})
            AND (${content ? `p."content" ILIKE '%' || $2 || '%'` : "1=1"})
          GROUP BY p."id"
        ) AS filtered_posts
        `,
        title || "",
        content || ""
      );

    return Number(postsQuantity[0].quantity);
  }

  async getPostsByUser(userID: string): Promise<Post[]> {
    const allUserPosts = await prismaClient.post.findMany({
      where: { userID: userID },
    });

    return allUserPosts;
  }

  async getLikes(postID: string): Promise<Like[]> {
    const allLikes = await prismaClient.like.findMany({
      where: { postID: postID },
    });

    return allLikes;
  }

  async getComments(postID: string): Promise<Comment[]> {
    const allComments = await prismaClient.comment.findMany({
      where: { postID: postID },
    });

    return allComments;
  }

  async findManyByID(postIDs: string[]): Promise<Post[]> {
    const posts = await prismaClient.post.findMany({
      where: {
        id: {
          in: postIDs,
        },
        deletedAt: null,
      },
    });

    return posts;
  }

  async removeDeletedPosts(): Promise<void> {
    await prismaClient.post.deleteMany({
      where: {
        deletedAt: { not: null },
      },
    });
  }
}
