import { createContext, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { PostsContextType } from "../@types/posts-context";
import profileImage1 from '../assets/prof-pic-1.png';
import profileImage4 from '../assets/prof-pic-4.png';
import usePost from "../hooks/usePost";
import generateRandomPostTime from "../services/generate-random-post-time-service";

export const PostContext = createContext<PostsContextType | null>(null);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const { posts, addPost } = usePost();

  // Criando posts para teste:
  // --------------------------------------------- //
  
  useEffect(() => {
    addPost({
      user: {
        id: uuidv4(),
        name: "Jessy Logan",
        profileImage: profileImage1,
        role: "animator",
        coverImage: "null"
      },
      description: "Esse aute ea esse mollit anim magna laborum irure sit.\n\n \
        Consequat qui magna labore esse cillum exercitation nulla aute. Enim id \
        mollit commodo ipsum eiusmod cupidatat et eu et qui. Tempor commodo eiusmod \
        ullamco ut ipsum tempor deserunt est mollit eiusmod aliquip labore.",
      postingTime: generateRandomPostTime(12, 16)
    });

    addPost({
      user: {
        id: uuidv4(),
        name: "spider dev",
        profileImage: profileImage4,
        role: "Animator",
        coverImage: "null"
      },
      description: "Esse aute ea esse mollit anim magna laborum irure sit. \
        Consequat qui magna labore esse cillum exercitation nulla aute. Enim id \
        mollit commodo ipsum eiusmod cupidatat et eu et qui. Tempor commodo eiusmod \
        ullamco ut ipsum tempor deserunt est mollit eiusmod aliquip labore.Esse aute ea esse mollit anim magna laborum irure sit. \
        Consequat qui magna labore esse cillum exercitation nulla aute. Enim id \
        mollit commodo ipsum eiusmod cupidatat et eu et qui. Tempor commodo eiusmod \
        ullamco ut ipsum tempor deserunt est mollit eiusmod aliquip labore.Esse aute ea esse mollit anim magna laborum irure sit. \
        Consequat qui magna labore esse cillum exercitation nulla aute. Enim id \
        mollit commodo ipsum eiusmod cupidatat et eu et qui. Tempor commodo eiusmod \
        ullamco ut ipsum tempor deserunt est mollit eiusmod aliquip labore.Esse aute ea esse mollit anim magna laborum irure sit. \
        Consequat qui magna labore esse cillum exercitation nulla aute. Enim id \
        mollit commodo ipsum eiusmod cupidatat et eu et qui. Tempor commodo eiusmod \
        ullamco ut ipsum tempor deserunt est mollit eiusmod aliquip labore.Esse aute ea esse mollit anim magna laborum irure sit. \
        Consequat qui magna labore esse cillum exercitation nulla aute. Enim id \
        mollit commodo ipsum eiusmod cupidatat et eu et qui. Tempor commodo eiusmod \
        ullamco ut ipsum tempor deserunt est mollit eiusmod aliquip labore.Esse aute ea esse mollit anim magna laborum irure sit. \
        Consequat qui magna labore esse cillum exercitation nulla aute. Enim id \
        mollit commodo ipsum eiusmod cupidatat et eu et qui. Tempor commodo eiusmod \
        ullamco ut ipsum tempor deserunt est mollit eiusmod aliquip labore.Esse aute ea esse mollit anim magna laborum irure sit. \
        Consequat qui magna labore esse cillum exercitation nulla aute. Enim id \
        mollit commodo ipsum eiusmod cupidatat et eu et qui. Tempor commodo eiusmod \
        ullamco ut ipsum tempor deserunt est mollit eiusmod aliquip labore.Esse aute ea esse mollit anim magna laborum irure sit. \
        Consequat qui magna labore esse cillum exercitation nulla aute. Enim id \
        mollit commodo ipsum eiusmod cupidatat et eu et qui. Tempor commodo eiusmod \
        ullamco ut ipsum tempor deserunt est mollit eiusmod aliquip labore.Esse aute ea esse mollit anim magna laborum irure sit. \
        Consequat qui magna labore esse cillum exercitation nulla aute. Enim id \
        mollit commodo ipsum eiusmod cupidatat et eu et qui. Tempor commodo eiusmod \
        ullamco ut ipsum tempor deserunt est mollit eiusmod aliquip labore.",
      postingTime: generateRandomPostTime(12, 16)
    });
    // --------------------------------------------------- //
  }, []);

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
}
