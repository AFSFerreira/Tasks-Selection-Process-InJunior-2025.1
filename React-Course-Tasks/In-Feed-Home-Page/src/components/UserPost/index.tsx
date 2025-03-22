import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UserPostProps } from '../../@types/user-post-props';
import { FeedbackContext } from '../../contexts/feedback-context';
import generateRandomPostTime from '../../services/generate-random-post-time-service';
import FeedbackComment from '../FeedbackComment/index';
import FeedbackInput from '../FeedbackInput/index';
import ProfileImage from '../ProfileImage/index';
import styles from './styles.module.css';
import { FeedbacksContextType } from '../../@types/feedbacks-context';
import getRelativeTime from '../../services/time-service';
import { User } from '../../@types/user';
import profileImage2 from '../../assets/prof-pic-2.png';
import profileImage3 from '../../assets/prof-pic-3.png';

const dummyUser1: User = {
  id: uuidv4(),
  name: "letícia marques",
  profileImage: profileImage3,
  role: "Dev Front-end",
  coverImage: ""
}

const dummyUser2: User = {
  id: uuidv4(),
  name: "letícia marques",
  profileImage: profileImage2,
  role: "Dev Back-end",
  coverImage: ""
}

export default function UserPost(props: UserPostProps) {
    const feedbacksContext = useContext<FeedbacksContextType | null>(FeedbackContext);

    if (!feedbacksContext) {
      return (<p>Error while loading feedbacks</p>);
    }

  const { feedbacks } = feedbacksContext;

  return (
    <>
      <div className={styles['post-box']}>
        <div className={styles['post-header-box']}>
          <div className={styles['post-profile-info-box']}>
            <ProfileImage
              src={props.user.profileImage}
              className={styles['post-custom-profile-pic']}
            />
            <div>
              <h3>{props.user.name}</h3>
              <p>{props.user.role}</p>
            </div>
          </div>
          <p>{`${getRelativeTime(props.postingTime, "Publicado há ")}`}</p>
        </div>

        <p className={styles['post-description']}>{props.description}</p>

        <FeedbackInput />

        <div className={styles['feedbacks-container']}>
            <FeedbackComment
              id={uuidv4()}
              likes={Math.floor(Math.random() * 8)}
            description="Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat.Esse aliqua anim duis ut nostrud voluptate fugiat."
              postingTime={generateRandomPostTime(1, 10)}
              user={dummyUser1}
            />

            <FeedbackComment
              id={uuidv4()}
              likes={Math.floor(Math.random() * 8)}
              description="Esse aliqua anim duis ut nostrud voluptate fugiat."
              postingTime={generateRandomPostTime(1, 10)}
              user={dummyUser2}
            />

            {feedbacks.map(feedback => (
              <FeedbackComment
                key={feedback.id}
                id={feedback.id}
                likes={feedback.likes}
                description={feedback.description}
                postingTime={feedback.postingTime}
                user={feedback.user}
              />
            ))}
        </div>
      </div>
    </>
  );
}
