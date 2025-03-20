import { useState } from "react";
import { Post } from "../@types/post";

export default function usePost() {
  const [posts, setPosts] = useState<Post[]>([]);

  function addPost(newPost: Post) {
    setPosts((prev) => [...prev, newPost]);
  }

  return { posts, addPost };
}
