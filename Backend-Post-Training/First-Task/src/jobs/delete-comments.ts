import cron from "node-cron";
import { PrismaCommentsRepository } from "src/repositories/prisma/prisma-comments-repository";
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-posts-repository";

cron.schedule("* * 1 * *", async () => {
    const prismaCommentsRepository = new PrismaCommentsRepository();
    const prismaPostsRepository = new PrismaPostsRepository();

    await prismaCommentsRepository.removeDeletedComments();
    await prismaPostsRepository.removeDeletedPosts();
});
