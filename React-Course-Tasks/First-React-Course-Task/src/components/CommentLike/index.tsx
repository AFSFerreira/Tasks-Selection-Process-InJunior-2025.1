import styles from './styles.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { CommentLikeProps } from '../../@types/comment-like-props';

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
        <FontAwesomeIcon icon={faThumbsUp} className={`${liked && styles['liked-icon-anim']}`} />
        <p>Like&nbsp;&nbsp;•&nbsp;&nbsp;{likesQuantity}</p>
      </div>
    </>
  );
}
