import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import Logo from '../Logo';
import cartIcon from '../../assets/shopping-cart.svg';
import UserIcon from '../../assets/Icon.svg'
import { ReactSVG } from 'react-svg';

export default function Header() {
  return (
    <>
      <div className={styles['header-container']}>
        <Link to="/">
          <Logo className={styles['header-logo']} />
        </Link>
        
        <nav className={styles['nav-icons-box']}>
          <ul>
            <li>
              <Link
                id="login-link"
                to="/login"
                className={styles['nav-link']}
              >
                <ReactSVG src={UserIcon} />
              </Link>
            </li>
            <li>
              <Link 
                to="/cart"
                className={styles['nav-link']}
              >
                <ReactSVG src={cartIcon} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
