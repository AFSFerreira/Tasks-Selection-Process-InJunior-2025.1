import styles from './styles.module.css';
import loginRegisterCoverImage from '../../assets/login-cover-image-alternative.png';
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <main className={styles['main-container']}>
        <div className={styles['cover-image-box']}>
          <img draggable={false} src={loginRegisterCoverImage} alt="login and register cover image" />
        </div>
        
        <div className={styles['auth-form-box']}>
          <Outlet />
        </div>
      </main>
    </>
  );
}
