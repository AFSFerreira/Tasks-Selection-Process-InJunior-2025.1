import { createRoot } from 'react-dom/client';
import Header from './components/Header/index.tsx';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <App />
);
