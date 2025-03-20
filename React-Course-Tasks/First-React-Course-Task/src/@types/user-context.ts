import { User } from "./user"

export type UserContextType = {
    user: User | null;
    setUser: (newUser: User) => void;
}
