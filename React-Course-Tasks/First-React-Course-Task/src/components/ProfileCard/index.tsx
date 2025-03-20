import styles from './styles.module.css';
import ProfileImage from '../ProfileImage/index';
import { ProfileCardProps } from '../../@types/profile-card-props';

export default function ProfileCard(props: ProfileCardProps) {
  const style: React.CSSProperties = {
    '--cover-image-url': `url(${props.user.coverImage})`
  } as React.CSSProperties;

  return (
    <>
      <div
        className={styles['profile-box']}
        style={style}
        >
        <div className={styles['profile-description-box']}>

          <ProfileImage 
            src={props.user.profileImage}
            alt="user profile picture"
            className={styles['custom-profile-card-picture']}
          />

          <div className={styles['info-box']}>
            <h2>{props.user.name}</h2>
            <p>{props.user.role}</p>
          </div>

        </div>
      </div>
    </>
  );
}
