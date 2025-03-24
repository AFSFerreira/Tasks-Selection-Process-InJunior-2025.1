import RootLayout from '../RootLayout';
import { createBrowserRouter } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import BookPage from './pages/BookPage';
import BooksByCategory from './pages/BooksByCategory';
import AuthLayout from './components/AuthLayout';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "books/:category",
        element: <BooksByCategory />
      },
      {
        path: "books/:category/:bookId",
        element: <BookPage />
      },
    ]
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        // redirecionaria para uma página
        // de cadastro se houvesse uma:
        path: "/register",
        element: <Login />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  }
]);

export default router;
