import { User } from "./user";

export type Post = {
    user: User;
    postingTime: Date;
    description: string;
}
