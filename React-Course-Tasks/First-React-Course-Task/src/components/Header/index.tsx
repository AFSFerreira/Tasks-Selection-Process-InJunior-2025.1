import styles from './styles.module.css';
import SVGLogo from '/Logo-in.svg';

export function Header() {

  // const postContext = useContext(PostContext);
  
    
  // const { posts } = postContext;

  // console.log(posts);

  return (
    <>
      <header className={styles['header-container']}>
        <img draggable={false} src={SVGLogo} className={styles['header-icon']} alt="in junior logo" />
        <h1 className={styles['header-title']}>Feed</h1>
      </header>
    </>
  );
}
