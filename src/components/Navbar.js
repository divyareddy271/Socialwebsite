import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import {Userfind} from "../api"
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  const [results,setResults] = useState([]);
  const [searchtext,setSearchtext] = useState('');
  const auth = useAuth();
  useEffect(() => {
    const handlesearch = async () => {
     
       const response = await Userfind(searchtext);
       if(response.success){
     
         setResults(response.data.users);
         console.log(results);
       } 
    }
    if(searchtext.length > 2){
      handlesearch();
    }
    else{
      setResults([]);
    }
  },[searchtext]);
 
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
            alt="Logo-img"
            className={styles.Logo}
          />
        </Link>
      </div >
      <div className={styles.search}>
         
          <img className={styles.searchicon}
          src="https://cdn-icons-png.flaticon.com/128/709/709592.png" 
          alt=""
          />
     
          <input placeholder="Search user"
           className={styles.searchinput}      
          value={searchtext}
          onChange = {(e)=>setSearchtext(e.target.value)}
          
          />
          
         
          {results.length > 0
           && (<div className={styles.searchresults}>
          
          <ul>
            {results.map((user) => (
              <li className={styles.Serchresultsrow}>
               <Link to={`/user/${user._id}`}>
               <img src="https://cdn-icons-png.flaticon.com/128/236/236831.png" alt="user profile" />
                <span>{user.name}</span>
               </Link>
              </li>
              )
            )}
          </ul>
          </div>)}
          
        
      </div>
      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://cdn-icons-png.flaticon.com/128/236/236831.png"
                alt="profilepic"
                className={styles.userDp}
              />
            </Link>
           <span>{auth.user.name}</span>
          </div>
        )}
        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <li onClick={auth.logout}>
                 Log out 
              </li>
            ) : (
             <>
             <li>
                <Link to="/Login"> Log in </Link>
              </li>
              <li> <Link to="/register">Register </Link></li>
              </>
            )}

        
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
