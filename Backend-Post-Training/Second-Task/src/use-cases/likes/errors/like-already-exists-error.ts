export class LikeAlreadyExistsError extends Error {
    constructor() {
        super('User has Already Liked this Post or Comment.');
    }
}
