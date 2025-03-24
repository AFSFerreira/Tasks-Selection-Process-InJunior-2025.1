import { RouterProvider } from 'react-router-dom';
import './styles/global.css';
import './styles/variables.css';
import router from './router';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
