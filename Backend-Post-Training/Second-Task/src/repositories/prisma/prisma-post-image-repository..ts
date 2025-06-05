import {
  PostImageDataCreateInput,
  PostImageRepository,
} from "../post-image-repository";
import { PostImage } from "@prisma/client"; // Ensure this matches your Prisma schema
import { prismaClient } from "src/lib/prisma";

export class PrismaPostImageRepository implements PostImageRepository {
  async findById(postImageID: string): Promise<PostImage | null> {
    const postImage = await prismaClient.postImage.findUnique({
      where: { id: postImageID },
    });

    return postImage;
  }

  async createPostImages(createPostImageData: PostImageDataCreateInput): Promise<void> {
    for (const postImage of createPostImageData.PostImageData) {
      await prismaClient.postImage.create({
        data: {
          postID: createPostImageData.postID,
          data: postImage.data,
          size: postImage.size,
        },
      });
    }
  }
}
