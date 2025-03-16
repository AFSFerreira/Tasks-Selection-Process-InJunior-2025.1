export class LikeAndCommentError extends Error {
    constructor() {
        super('Like Cannot Have Both \'postID\' and \'commentID\' Properties Simultaneously in the Request Body');
    }
}
