import { ReactSVG } from "react-svg";
import LogoProps from "../../@types/logo-props";
import libraryLogo from "../../assets/Logo.svg";
import styles from "./styles.module.css";

export default function Logo(props: LogoProps) {
  return (
    <>
      <ReactSVG
        {...props}
        draggable={false}
        src={libraryLogo}
        className={`${styles["logo-img"]} ${props.className}`}
        beforeInjection={(svg) => {
          svg.querySelectorAll("path").forEach((path) => {
            path.setAttribute("stroke", "currentColor");
            path.setAttribute("fill", "currentColor");
          });
        }}
      />
    </>
  );
}
