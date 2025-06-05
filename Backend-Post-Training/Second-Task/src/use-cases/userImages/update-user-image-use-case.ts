import { UserImageDataUpdateInput, UserImageRepository } from "../../repositories/user-image-repository";

export class UpdateUserImageUseCase {
  constructor(private userImageRepository: UserImageRepository) {}

  async execute(updateUserImageData: UserImageDataUpdateInput): Promise<void> {
    if (!updateUserImageData.userID || !updateUserImageData.data || updateUserImageData.size <= 0) {
      throw new Error("Invalid input data. User ID, image data, and size are required.");
    }

    await this.userImageRepository.updateUserImage(updateUserImageData);
  }
}
