import { PostImageDataCreateInput, PostImageRepository } from "../../repositories/post-image-repository";

export class CreatePostImagesUseCase {
  constructor(private postImageRepository: PostImageRepository) {}

  async execute(createPostImageData: PostImageDataCreateInput): Promise<void> {
    if (!createPostImageData.postID || createPostImageData.PostImageData.length === 0) {
      throw new Error("Invalid input data. Post ID and image data are required.");
    }

    await this.postImageRepository.createPostImages(createPostImageData);
  }
}
