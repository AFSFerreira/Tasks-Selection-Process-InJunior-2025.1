-- CreateTable
CREATE TABLE "user-photos" (
    "id" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "data" BYTEA NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "user-photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post-images" (
    "id" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "data" BYTEA NOT NULL,
    "postID" TEXT NOT NULL,

    CONSTRAINT "post-images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user-photos_userID_key" ON "user-photos"("userID");

-- AddForeignKey
ALTER TABLE "user-photos" ADD CONSTRAINT "user-photos_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post-images" ADD CONSTRAINT "post-images_postID_fkey" FOREIGN KEY ("postID") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
