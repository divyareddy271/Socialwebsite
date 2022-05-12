import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css"
 const Navbar = () => {
    return(
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to="/">
                    <img
                    src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                     alt ="Logo-img" className={styles.Logo}/>
                    </Link>
            </div>
            <div className={styles.rightNav}>
                <div className={styles.user}>
                <Link to="/">
                    <img 
                    src="https://cdn-icons-png.flaticon.com/128/236/236831.png" 
                    alt ="profilepic" className = {styles.userDp} />
                    </Link>
                </div>
                <span>Aakash</span>
            </div>
            <div className={styles.navLinks}>
                <ul>
                    <li>
                    <Link to="/Login"> Log in </Link> 
                    </li>
                    <li>
                    <Link to="/"> Log out </Link> 
                    </li>
                    <li>
                    <Link to="/register">Register </Link> 
                    </li>
                </ul>

            </div>
        </div>
    );
}
export default Navbar;