import { FastifyInstance } from "fastify";
import { uploadPostPics } from "./upload-post-image";
import { upload } from "src/config/multer";
import { decodeJWTMiddleware } from "src/http/middlewares/decode-jwt";
import { uploadUserImage } from "./upload-user-image";
import { updateUserImage } from "./update-user-image";

export function uploadRoutes(app: FastifyInstance) {
    app.post('/uploads/posts/:postID', { preHandler: upload.array('postPics', 10), onRequest: [decodeJWTMiddleware] }, uploadPostPics);
    app.post('/uploads/users', { preHandler: upload.single('userPic'), onRequest: [decodeJWTMiddleware] }, uploadUserImage);
    
    app.patch('/uploads/users', { preHandler: upload.single('userPic'), onRequest: [decodeJWTMiddleware] }, updateUserImage);
}
