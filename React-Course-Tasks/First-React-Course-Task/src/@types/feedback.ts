import { User } from "./user";

export type Feedback = {
    id: string;
    user: User;
    postingTime: Date;
    description: string;
    likes: number;
}
