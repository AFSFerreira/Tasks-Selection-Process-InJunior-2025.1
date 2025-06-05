import { PostImage } from "@prisma/client";

interface PostImageData {
  size: number;
  data: Buffer;
}

export interface PostImageDataCreateInput {
  postID: string;
  PostImageData: PostImageData[];
}

export interface PostImageRepository {
  findById(postImageID: string): Promise<PostImage | null>;
  createPostImages(createPostImageData: PostImageDataCreateInput): Promise<void>;
}
