import styles from './styles.module.css';
import { ProfileImageProps } from "../../@types/profile-image-props";

export default function ProfileImage(props: ProfileImageProps) {
  return (
    <>
      <img {...props} draggable={false} src={props.src} className={`${styles['profile-image']} ${props.className}`} />
    </>
  );
}
