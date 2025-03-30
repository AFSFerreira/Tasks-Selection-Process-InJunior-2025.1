import { useEffect } from 'react';
import BannerProps from '../../@types/banner-props';
import styles from './styles.module.css';

export default function Banner(props: BannerProps) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / docHeight) * 50;

      // Define a variável CSS globalmente
      document.documentElement.style.setProperty("--scroll-Y-perc", `${Math.min(scrollPercentage + 70, 100)}%`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={styles["home-page-banner-box"]}>
        <div className={styles["banner-title"]}>
          <div>
            <div>25% de desconto</div> nos livros do Paulo Coelho!
          </div>
        </div>
        <div className={styles["img-box"]}>
          <img
            draggable={false}
            src={props.bannerImage}
            alt="home image banner"
            className={styles["home-banner-image"]}
          />
        </div>
      </div>
    </>
  );
}
