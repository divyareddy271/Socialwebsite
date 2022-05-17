

//import styles from "../styles/userprofile.module.css"
import styles from "../styles/settings.module.css"
import { useAuth } from "../hooks";
import { useLocation } from "react-router-dom";
const Userprofile =() =>{
    const location = useLocation();
    const auth = useAuth();
    console.log(location);
    const user = location.state.user;
return(
    <div className={styles.settings}>
        <div className={styles.imagecontainer}>
            <img
            src="https://cdn-icons-png.flaticon.com/128/236/236831.png"
            alt="profilepic"
            className={styles.userDp}
            />
        </div>
        <div className={styles.field}>
            <div className={styles.fieldName}>Email</div>
            <div className={styles.fieldValue}>{user.email}</div>
        </div>
        <div className={styles.field}>
            <div className={styles.fieldName}>Name</div>
            <div className={styles.fieldValue}>{user?.name}</div>
        </div>
        <div className={styles.btnGrp }>
            <div className={styles.btn}>
                <button className={styles.saveBtn} >Add Friend</button>
            </div>
            <div className={styles.btn}>
                <button className={styles.saveBtn} >Remove Friend</button>
            </div>
        </div>
    </div>
)
}
export default Userprofile;