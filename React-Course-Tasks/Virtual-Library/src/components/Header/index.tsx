import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Logo from "../Logo";
import cartIcon from "../../assets/shopping-cart.svg";
import UserIcon from "../../assets/Icon.svg";
import { ReactSVG } from "react-svg";
import { useState } from "react";

export default function Header() {
  const [resetAnim, setResetAnim] = useState<boolean>(true);

  const handleResetAnim = () => {
    // Função usada pra resetar a animação de keyframes:
    setResetAnim(false);
    setTimeout(() => setResetAnim(true), 10);
  }

  return (
    <>
      <div className={styles["header-container"]}>
        <Link to="/">
          <Logo className={styles["header-logo"]} />
          <Logo
            className={`${styles["header-logo-back"]} ${resetAnim && styles['header-logo-back-anim']}`}
            onMouseEnter={(event) => {
              if (event.target instanceof Element) {
                const computedStyle = window.getComputedStyle(event.target);
                const logoOpacity = computedStyle.opacity;

                // Verifica se a opacidade é 0
                if (logoOpacity === "0") {
                  handleResetAnim();
                }
  
                // Verifica se a opacidade é 0
                if (logoOpacity === "0") {
                  handleResetAnim();
                }
              }
            }}
          />
        </Link>

        <nav className={styles["nav-icons-box"]}>
          <ul>
            <li>
              <Link to="/login" className={styles["nav-link"]}>
                <ReactSVG
                  src={UserIcon}
                  beforeInjection={(svg) => {
                    svg.querySelectorAll("path").forEach((path) => {
                      path.setAttribute("stroke", "currentColor");
                    });
                  }}
                />
              </Link>
            </li>
            <li>
              <Link to="/cart" className={styles["nav-link"]}>
                <ReactSVG
                  src={cartIcon}
                  beforeInjection={(svg) => {
                    svg.querySelectorAll("path").forEach((path) => {
                      path.setAttribute("stroke", "currentColor");
                    });
                  }}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
