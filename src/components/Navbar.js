import styles from "../styles/navbar.module.css"
 const Navbar = () => {
    return(
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <a href="/">
                    <img
                    src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                     alt ="Logo-img" className={styles.Logo}/>
                    </a>
            </div>
            <div className={styles.rightNav}>
                <div className={styles.user}>
                    <a href="/">
                    <img 
                    src="https://cdn-icons-png.flaticon.com/128/236/236831.png" 
                    alt ="profilepic" className = {styles.userDp} />
                    </a>
                </div>
                <span>Aakash</span>
            </div>
            <div className={styles.navLinks}>
                <ul>
                    <li>
                    <a href="/"> Log in </a> 
                    </li>
                    <li>
                    <a href="/"> Log out </a> 
                    </li>
                    <li>
                    <a href="/">Register </a> 
                    </li>
                </ul>

            </div>
        </div>
    );
}
export default Navbar;