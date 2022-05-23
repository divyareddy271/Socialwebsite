import { Routes, Route } from "react-router-dom";
import { Home, Login, Register, Settings, Friendslist } from "../pages";
import Navbar from "../components/Navbar";
//import Loader from './Loader';
import { useAuth } from "../hooks";
import { useNavigate, Navigate } from "react-router-dom";
import Userprofile from "../pages/Userprofile";
import  "../styles/index.css";
/*function PrivateRoute({ children, ...rest }) {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={() => {
        if (auth.user) {
          return children;
        } else {
          return navigate("/login");
        }
      }}
    />
  );
}*/
function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
}

const Page404 = () => {
  return <h1>404</h1>;
};
function App() {
  const auth = useAuth();

  if (auth.loding) {
    //return <Loader />
  }
  
  return (
    <div className="myStyle" >
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/error" element={<Page404 />}></Route>
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user/:userId"
            element={
              <PrivateRoute>
                <Userprofile />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
 
    </div>
  );

};

export default App;
