import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import BookCard from "../BookCard";
import BooksCategoryProps from "../../@types/books-category-props";
import { useEffect, useRef, useState } from "react";
import useBookStore from "../../stores/BookStore";

export default function BooksCategory(props: BooksCategoryProps) {
  const { filterBooksByCategory, booksBycategory } = useBookStore();
  const [booksContainerWidth, setBooksContainerWidth] = useState<number>(0);
  const [booksPerCategoryContainer, setBooksPerCategoryContainer] =
    useState<number>(0);
  const booksContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!booksContainerRef) return;

    if (booksContainerRef.current) {
      // ... + 20 porque existe 20px de gap no flexbox:
      const minBookWidth = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--min-book-card-width")
          .slice(0, -2)
      );

      const gapWidth = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--book-card-gap")
          .slice(0, -2)
      );

      const booksPerCategory = Math.floor(
        (booksContainerWidth + gapWidth) / (minBookWidth + gapWidth)
      );

      setBooksPerCategoryContainer(booksPerCategory);
    }
  }, [booksContainerWidth]);

  useEffect(() => {
    filterBooksByCategory();
  }, [filterBooksByCategory]);

  useEffect(() => {
    const currentRef = booksContainerRef?.current;

    if (!currentRef) return;

    const resizeObserver = new ResizeObserver(() => {
      if (booksContainerRef.current) {
        setBooksContainerWidth(booksContainerRef.current.clientWidth);
      }
    });

    resizeObserver.observe(currentRef);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          currentRef.classList.remove(
            styles["show-container"],
            styles["show-from-bottom"],
            styles["show-from-top"]
          );

          if (entry.isIntersecting) {
            currentRef.classList.add(styles["show-container"]);
            
          } else {
            const { top, bottom } = entry.boundingClientRect;
            const fromTop = bottom < window.innerHeight && top < 0;

            currentRef.classList.add(styles[fromTop ? "show-from-bottom" : "show-from-top"]);
          }
        });
      },
      { threshold: 0.2 }
    );

    intersectionObserver.observe(currentRef);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={booksContainerRef}
        className={styles["books-category-container"]}
      >
        <div className={styles["books-category-header"]}>
          <p>{props.booksCategory}</p>
          <Link to={`/books/${props.booksCategory}`}>Ver mais</Link>
        </div>

        <div className={styles["books-box"]}>
          <div className={styles["opacity-hover-effect"]}>
            {props.books
              .slice(
                0,
                Math.min(
                  booksBycategory.get("Best-sellers")?.length || 0,
                  booksPerCategoryContainer
                )
              )
              .map((currentBook) => (
                <BookCard
                  key={currentBook.id}
                  {...currentBook}
                  className={styles["book-card"]}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
