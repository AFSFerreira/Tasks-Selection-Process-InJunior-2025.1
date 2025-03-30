import BookCardProps from "../../@types/book-card-props";
import styles from "./styles.module.css";

export default function BookCard(props: BookCardProps) {
  return (
    <>
      <div className={`${styles["book-content-container"]} ${props.className}`}>
        <div className={styles["book-hover-background-box"]}>
          <img
            draggable={false}
            src={props.capa}
            alt="book hover cover image"
            className={styles["book-hover-background"]}
          />
        </div>

        <div className={styles["book-content-box"]}>
          <img
            draggable={false}
            src={props.capa}
            alt="book cover image"
            className={styles["book-cover-image"]}
          />

          <div className={styles["book-info-box"]}>
            <div className={styles["book-title-box"]}>
              <p>{props.titulo}</p>
              <p>{props.autor}</p>
            </div>

            <p>R${Number(props.preco).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  );
}
