import { useEffect } from "react";

import {getPosts} from "../api/index";
import {Home} from "../pages";
function App() {
  useEffect(()=> {
    const fetchPosts = async () => {
      const response = await  getPosts();
      console.log('response',response);
    }
    fetchPosts();
  },[])
  return (
    <div className="App">
      <Home  />
    </div>
  );
}

export default App;
