import { Route, Routes } from 'react-router-dom';
import AddPost from './Components/AddPost';
import EditPost from './Components/EditPost';
import NewPost from './Components/NewPost';
import Posts from './Components/Posts';
import ViewPost from './Components/ViewPost';

function App() {
  return (
    <div className="App">
      <AddPost />
      <Routes>
        <Route
          path="/"
          element={<Posts />}
        />
        <Route
          path="/createPost"
          element={<NewPost />}
        />
        {/* страница просмотра */}
        <Route
          path="/posts/:postId"
          element={<ViewPost />}
        />
        <Route
          path="/posts/:postId/edit"
          element={<EditPost />}
        />
      </Routes>
    </div>
  );
}

export default App;
