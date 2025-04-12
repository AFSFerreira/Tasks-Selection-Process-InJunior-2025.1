import { Post } from "@prisma/client";
import cron from "node-cron";
import { sendWeeklyPostSummary } from "src/emails/email-service";
import { PrismaLikesRepository } from "src/repositories/prisma/prisma-likes-repository";
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-posts-repository";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { GetMostLikedPosts } from "../use-cases/posts/get-most-liked-posts";

cron.schedule("* * * * 1", async () => {
  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaPostsRepository = new PrismaPostsRepository();
  const prismaLikesRepository = new PrismaLikesRepository();

  const getAllLikeUseCase = new GetMostLikedPosts(
    prismaPostsRepository,
    prismaLikesRepository
  );

  const allUsers = await prismaUsersRepository.getAll();

  const mostLikedPosts: Post[] = await getAllLikeUseCase.execute({});

  allUsers.forEach((user) => {
    sendWeeklyPostSummary(user.email, user.name, mostLikedPosts);
  });
});

// cronSchedule.start();
