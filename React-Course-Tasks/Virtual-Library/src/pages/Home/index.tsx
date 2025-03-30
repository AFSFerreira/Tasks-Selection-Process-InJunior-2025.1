import { useEffect } from "react";
import useBookStore from "../../stores/BookStore";
import styles from "./styles.module.css";
import homeBanner from "../../assets/homeBanner.png";
import Banner from "../../components/Banner";
import BooksCategory from "../../components/BooksCategory";

export default function Home() {
  const { filterBooksByCategory, booksBycategory } = useBookStore();

  useEffect(() => {
    filterBooksByCategory();
  }, [filterBooksByCategory]);

  return (
    <>
      <main className={styles["home-page-container"]}>
        <Banner bannerImage={homeBanner} />

        <section className={styles["books-by-category-container"]}>
          {Array.from(booksBycategory.keys()).map((key) => {
            return (
              <BooksCategory
                key={key}
                booksCategory={key}
                books={booksBycategory.get(key)!}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
