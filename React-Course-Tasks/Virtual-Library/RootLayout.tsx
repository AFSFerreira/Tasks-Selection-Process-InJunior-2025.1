import Header from './src/components/Header/index';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
