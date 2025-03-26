import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import BookCard from "../BookCard";
import BooksCategoryProps from "../../@types/books-category-props";

export default function BooksCategorySection(props: BooksCategoryProps) {
  return (
    <>
      <div className={styles["books-category-container"]}>
        <div className={styles["books-category-header"]}>
          <p>{props.booksCategory}</p>
          <Link to={`/books/${props.booksCategory}`}>Ver mais</Link>
        </div>

        <div className={styles["books-box"]}>
          {props.books.map((currentBook) => (
            <BookCard key={currentBook.id} {...currentBook} />
          ))}
        </div>
      </div>
    </>
  );
}
