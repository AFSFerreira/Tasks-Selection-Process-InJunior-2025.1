import styles from './styles.module.css';
import ProfileImage from '../ProfileImage/index';
import CommentLike from '../CommentLike/index';
import TrashIcon from '../../assets/Trash.svg'
import { ReactSVG } from 'react-svg';
import { FeedbackCommentInput } from '../../@types/feedback-comment-input';
import getRelativeTime from '../../services/time-service';
import { FeedbackContext } from '../../contexts/feedback-context';
import { FeedbacksContextType } from '../../@types/feedbacks-context';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user-context';
import { UserContextType } from '../../@types/user-context';

export default function FeedbackComment(props: FeedbackCommentInput) {
  const userContext = useContext<UserContextType | null>(UserContext);
  const feedbacksContext = useContext<FeedbacksContextType | null>(FeedbackContext);
  
  if (!userContext) {
    return (<p>Error while loading user</p>);
  }
  
  if (!feedbacksContext) {
    return (<p>Error while loading feedbacks</p>);
  }

  const { user } = userContext;

  const { removeFeedback } = feedbacksContext;

  const handleClick = () => {
    if (user?.id !== props.user.id) {
      alert("Você não pode deletar um comentário de outro usuário!");
      return;
    }

    if (confirm("Você gostaria de deletar este comentário?")) {
      removeFeedback(props.id);
    }
  }

  return (
    <>
      <div className={styles['comment-box']}>
        <ProfileImage
          src={props.user.profileImage}
          className={styles['custom-feedback-profile-pic']}
        />

        <div className={styles['comment-info-box']}>
          <div className={styles['comment-content-box']}>
            <div>
              <div className={styles['comment-header-box']}>
                <h4>{props.user.name}</h4>
                <p>{`${getRelativeTime(props.postingTime, "Cerca de ")}`}</p>
              </div>
              <p>{props.description}</p>
            </div>

            <ReactSVG
              src={TrashIcon}
              onClick={handleClick}
              className={`${styles['trash-icon']}`}
            />
          </div>

          <CommentLike
            likesQuantity={props.likes}
            className={styles['comment-like-icon']}
          />
        </div>
      </div>
    </>
  );
}
