import { PostImage } from "@prisma/client";

export interface UserImageDataCreateInput {
  userID: string;
  size: number;
  data: Buffer;
}

export interface UserImageDataUpdateInput {
  userID: string;
  size: number;
  data: Buffer;
}

export interface UserImageRepository {
  createUserImage(createUserImageData: UserImageDataCreateInput): Promise<void>;
  updateUserImage(updateUserImageData: UserImageDataUpdateInput): Promise<void>;
}
