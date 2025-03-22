import { PostProvider } from './contexts/post-context';
import { UserProvider } from './contexts/user-context';
import InFeed from './pages/home/home';
import './styles/globals.css';

function App() {
  return (
    <>
      <PostProvider>
        <UserProvider>
          <InFeed />
        </UserProvider>
      </PostProvider>
    </>
  );
}

export default App;
