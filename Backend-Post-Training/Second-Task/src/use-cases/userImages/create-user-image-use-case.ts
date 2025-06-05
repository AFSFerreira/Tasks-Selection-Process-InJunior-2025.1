import { UserImageDataCreateInput, UserImageRepository } from "../../repositories/user-image-repository";

export class CreateUserImageUseCase {
  constructor(private userImageRepository: UserImageRepository) {}

  async execute(createUserImageData: UserImageDataCreateInput): Promise<void> {
    if (!createUserImageData.userID || !createUserImageData.data || createUserImageData.size <= 0) {
      throw new Error("Invalid input data. User ID, image data, and size are required.");
    }

    await this.userImageRepository.createUserImage(createUserImageData);
  }
}
