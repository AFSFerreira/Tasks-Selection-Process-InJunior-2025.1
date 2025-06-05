import { prismaClient } from "src/lib/prisma";
import {
  UserImageDataCreateInput,
  UserImageDataUpdateInput,
  UserImageRepository,
} from "../user-image-repository";

export class PrismaUserImageRepository implements UserImageRepository {
  async createUserImage(
    createUserImageData: UserImageDataCreateInput
  ): Promise<void> {
    await prismaClient.userImage.create({
      data: {
        userID: createUserImageData.userID,
        size: createUserImageData.size,
        data: createUserImageData.data
      },
    });
  }

  async updateUserImage(updateUserImageData: UserImageDataUpdateInput): Promise<void> {
    await prismaClient.userImage.update({
        where: {
            userID: updateUserImageData.userID,
        },
        data: {
            size: updateUserImageData.size,
            data: updateUserImageData.data,
        },
    });
  }
}
