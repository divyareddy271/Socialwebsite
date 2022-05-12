import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Register } from '../pages';
import { getPosts } from '../api';
import { Home } from '../pages';
import  Loader  from './Loader';
import Navbar from './Navbar';
//import {Navbar} from "./";
const About = () => {
  return <h1>About</h1>
}
const UserInfo = () => {
  return <h1>UserInfo</h1>
}
const Page404 = () => {
  return <h1>Error Page - 404</h1>
}
function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);
if(loading){
 return <Loader />;
}
 
  return (
    <div className="App">
       <Navbar />
      <Routes>
        <Route path="/"
        element={<Home  posts={posts}/>}>
        </Route>
        <Route path="/about"
          element = {<About />} >
        </Route>
        <Route exact path="/info"
        element = {<UserInfo />}>
        </Route>
        <Route path="/login"
        element =  {<Login /> }>
        </Route>
        <Route path="/login"
        element =  {<Page404 /> }>
        </Route>
        <Route path="/register"
        element =  {<Register /> }>
        </Route>
       
      </Routes>
      
    </div>
  );
}

export default App;
