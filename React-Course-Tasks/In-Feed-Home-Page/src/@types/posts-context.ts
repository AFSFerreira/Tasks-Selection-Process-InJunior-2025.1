import { Post } from "./post"

export type PostsContextType = {
    posts: Post[];
    addPost: (newPost: Post) => void;
}
