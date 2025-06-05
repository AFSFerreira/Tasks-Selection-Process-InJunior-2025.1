export class LikeOrCommentError extends Error {
    constructor() {
        super('Like Must Have at Least \'postID\' or \'commentID\' properties in Request Body');
    }
}
