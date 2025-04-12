export class InvalidCredentialsError extends Error {
    constructor() {
        super('Invalid Email or Password');
    }
}
