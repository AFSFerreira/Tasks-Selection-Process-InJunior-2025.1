import { useEffect } from "react";
import useBookStore from "../../stores/BookStore";
import styles from "./styles.module.css";
import homeBanner from "../../assets/homeBanner.png";

export default function Home() {
  const {
    fetchAllBooks,
    filterBooksByCategory,
    booksBycategory,
    allBooksAvailable,
  } = useBookStore();

  useEffect(() => {
    fetchAllBooks();
  }, []);

  useEffect(() => {
    filterBooksByCategory();
  }, [allBooksAvailable]);

  useEffect(() => {}, [booksBycategory]);

  return (
    <>
      <main className={styles["home-page-container"]}>
        <div className={styles["home-page-banner-box"]}>
          <div className={styles["banner-title"]}>
            <p><div>25% de desconto</div> nos livros do Paulo Coelho!</p>
          </div>
          <div className={styles['img-box']}>
            <img
              draggable={false}
              src={homeBanner}
              alt="home image banner"
              className={styles["home-banner-image"]}
            />
          </div>
        </div>

        {/* {Array.from(booksBycategory.keys()).map((category) => (
          <p>{category}</p>
        ))} */}
      </main>
    </>
  );
}
