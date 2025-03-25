import { create } from "zustand";
import api from "../services/api";
import Book from "../@types/book";

interface BookStore {
  allBooksAvailable: Book[];
  booksCart: Book[];
  booksBycategory: Map<string, Book[]>;

  fetchAllBooks: () => Promise<void>;
  filterBooksByCategory: () => void;
  addBookToCart: (newBook: Book) => void;
  removeBookFromCart: (removedBook: Book) => void;
}

const useBookStore = create<BookStore>((set, get) => ({
  allBooksAvailable: [],
  booksCart: [],
  booksBycategory: new Map(),

  fetchAllBooks: async () => {
    try {
      const response = await api.get("/livros");

      set(() => ({
        allBooksAvailable: response.data,
      }));
    } catch (error) {
      console.error("Erro ao carregar livros:", error);
    }
  },

  filterBooksByCategory: () => {
    const { allBooksAvailable, booksBycategory } = get();

    const updatedBooksByCategory = new Map(booksBycategory);

    allBooksAvailable.forEach((book) => {
      const bookGenre = book.genero;

      if (!updatedBooksByCategory.has(bookGenre)) {
        updatedBooksByCategory.set(bookGenre, []);
      }

      if (
        !updatedBooksByCategory
          .get(bookGenre)
          ?.some((arrayBook) => arrayBook.id === book.id)
      ) {
        updatedBooksByCategory.get(bookGenre)?.push(book);
      }
    });

    set(() => ({ booksBycategory: updatedBooksByCategory }));
  },

  addBookToCart: (newBook: Book) => {
    set((state) => ({
      booksCart: [...state.booksCart, newBook],
    }));
  },

  removeBookFromCart: (removedBook: Book) => {
    set((state) => ({
      booksCart: state.booksCart.filter((book) => book.id !== removedBook.id),
    }));
  },
}));

export default useBookStore;
