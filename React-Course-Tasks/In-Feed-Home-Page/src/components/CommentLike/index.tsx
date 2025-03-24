import styles from './styles.module.css';
import { useState } from 'react';
import LikeIcon from '../../assets/LikeIcon.svg';
import { CommentLikeProps } from '../../@types/comment-like-props';
import { ReactSVG } from 'react-svg';

export default function CommentLike(props: CommentLikeProps) {
  const [liked, setLiked] = useState<boolean>(false);
  const [likesQuantity, setLikesQuantity] = useState<number>(props.likesQuantity);
  
  function handleLikeClick() {
    setLiked((prevLiked) => {
      const newLiked = !prevLiked;

      setLikesQuantity((prevLikesQuantity) => {
        return prevLikesQuantity + (newLiked ? 1 : (-1));
      })

      return newLiked;
    });
  }

  return (
    <>
      <div onClick={handleLikeClick} className={`${styles['like-box']} ${liked && styles['liked']} ${props.className}`}>
        <ReactSVG
          src={LikeIcon}
          className={`${liked && styles['liked-icon-anim']}`}

          beforeInjection={(svg) => {
            svg.querySelectorAll("path").forEach((path) => {
              path.setAttribute("stroke", "currentColor");
            });

          }}
        />
        <p>Like&nbsp;&nbsp;•&nbsp;&nbsp;{likesQuantity}</p>
      </div>
    </>
  );
}
