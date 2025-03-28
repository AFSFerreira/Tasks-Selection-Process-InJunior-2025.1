import { useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';
import { Header } from '../../components/Header';
import { PostContext } from '../../contexts/post-context';
import profileImage from '../../assets/profile-picture.png';
import dummyProfilePic from '../../assets/prof-pic-5.png';
import ProfileCard from '../../components/ProfileCard';
import { FeedbackProvider } from '../../contexts/feedback-context';
import UserPost from '../../components/UserPost';
import { User } from '../../@types/user';
import { UserContext } from '../../contexts/user-context';
import userCoverImage from '../../assets/matrix.gif';
import dummyUserCoverImage from '../../assets/noise-background.gif';

const loggedUser: User = {
  id: uuidv4(),
  name: "Allber ferreira",
  profileImage: profileImage,
  role: "Dev back-end",
  coverImage: userCoverImage
}

const dummyUser: User = {
  id: uuidv4(),
  name: "Su5HI",
  profileImage: dummyProfilePic,
  role: "Artist/Veterinary",
  coverImage: dummyUserCoverImage
}

export default function InFeed() {
  const postsContext = useContext(PostContext);
  const userContext = useContext(UserContext);

  useEffect(() => {
    setUser(loggedUser);
  }, []);

  if (!postsContext) {
    return (<p>Error while loading posts</p>);
  }

  if (!userContext) {
    return (<p>Error while loading user</p>);
  }

  const { setUser } = userContext;
  const { posts } = postsContext;

  return (
    <>
      <Header />

      <main>
        <div className={styles['profile-cards-container']}>
          <ProfileCard
            user={loggedUser}
          />
          
          <ProfileCard
            user={dummyUser}
          />
        </div>

        <div className={styles['users-posts-container']}>
          {posts.map((post) => (
            <FeedbackProvider key={uuidv4()}>
              <UserPost
                key={post.user.id}
                user={post.user}
                description={post.description}
                postingTime={post.postingTime}
              />
            </FeedbackProvider>
          ))}
        </div>
      </main>
    </>
  );
}
