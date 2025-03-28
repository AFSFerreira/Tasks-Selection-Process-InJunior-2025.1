import { useEffect, useRef, useState } from "react";
import useBookStore from "../../stores/BookStore";
import styles from "./styles.module.css";
import homeBanner from "../../assets/homeBanner.png";
import BooksCategorySection from "../../components/BooksCategorySection";

export default function Home() {
  const { filterBooksByCategory, booksBycategory } = useBookStore();
  const [booksContainerWidth, setBooksContainerWidth] = useState<number>(0);
  const [booksPerCategoryContainer, setBooksPerCategoryContainer] =
    useState<number>(0);
  const booksContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (booksContainerRef?.current) {
      // ... + 20 porque existe 20px de gap no flexbox:
      const minBookWidth =
        Number(
          getComputedStyle(document.documentElement)
            .getPropertyValue("--min-book-card-width")
            .slice(0, -2)
        ) + 20;

      const booksPerCategory = Math.floor(
        (booksContainerWidth + 20) / (minBookWidth + 20)
      );

      setBooksPerCategoryContainer(booksPerCategory);
    }
  }, [booksContainerWidth]);

  useEffect(() => {
    filterBooksByCategory();
  }, [filterBooksByCategory]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (booksContainerRef.current) {
        setBooksContainerWidth(booksContainerRef.current.clientWidth);
      }
    });

    if (booksContainerRef.current) {
      resizeObserver.observe(booksContainerRef.current);
    }

    return () => {
      if (booksContainerRef.current) {
        resizeObserver.unobserve(booksContainerRef.current);
      }
    };
  }, []);

  return (
    <>
      <main ref={booksContainerRef} className={styles["home-page-container"]}>
        <div className={styles["home-page-banner-box"]}>
          <div className={styles["banner-title"]}>
            <div>
              <div>25% de desconto</div> nos livros do Paulo Coelho!
            </div>
          </div>
          <div className={styles["img-box"]}>
            <img
              draggable={false}
              src={homeBanner}
              alt="home image banner"
              className={styles["home-banner-image"]}
            />
          </div>
        </div>

        {booksBycategory.get("Best-sellers") && (
          <BooksCategorySection
            booksCategory="Best-sellers"
            books={booksBycategory
              .get("Best-sellers")
              ?.slice(
                0,
                Math.min(
                  booksBycategory.get("Best-sellers")?.length,
                  booksPerCategoryContainer
                )
              )}
          />
        )}
        {/* {Array.from(booksBycategory.keys()).map((category) => (
          <p>{category}</p>
        ))} */}
      </main>
    </>
  );
}
