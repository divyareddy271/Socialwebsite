
import { Routes, Route } from 'react-router-dom';
import { Home, Login, Register } from '../pages';
import  Navbar  from '../components/Navbar';
//import Loader from './Loader';
import { useAuth } from '../hooks';

const Page404 = () => {
  return <h1>404</h1>;
};
function App() {
  const auth = useAuth();

 
  if(auth.loding){
    //return <Loader />
  }
  return (
    <div className="App">
       <Navbar />
      <Routes>
        <Route path="/"
        element={<Home/>}>
        </Route>
        <Route path="/login"
        element =  {<Login /> }>
        </Route>
        <Route path="/register"
        element =  {<Register /> }>
        </Route>
       
      </Routes>
      
    </div>
  );
}

export default App;
