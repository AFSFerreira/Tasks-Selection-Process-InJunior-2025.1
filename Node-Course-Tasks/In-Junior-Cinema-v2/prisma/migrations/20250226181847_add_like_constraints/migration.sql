-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT NOT NULL,
    "postID" TEXT NOT NULL,
    CONSTRAINT "comments_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "comments_postID_fkey" FOREIGN KEY ("postID") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT NOT NULL,
    "postID" TEXT,
    "commentID" TEXT,
    CONSTRAINT "likes_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "likes_postID_fkey" FOREIGN KEY ("postID") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "likes_commentID_fkey" FOREIGN KEY ("commentID") REFERENCES "comments" ("id") ON DELETE CASCADE ON UPDATE CASCADE

    CONSTRAINT "check_post_or_comment" CHECK (
        ("postID" IS NOT NULL AND "commentID" IS NULL) or
        ("postID" IS NULL AND "commentID" IS NOT NULL)
    )
);

-- CreateIndex
CREATE UNIQUE INDEX "comments_id_key" ON "comments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_id_key" ON "likes"("id");
