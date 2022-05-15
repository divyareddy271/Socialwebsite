import { useState } from "react";
import { useAuth } from "../hooks";
import styles from "../styles/settings.module.css";

const Settings = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm_password, SetConfirm_password] = useState("");
  const [editmode, setEditmode] = useState(false);
  const [savingform, setSavingform] = useState(false);
  const disablededitmode = () => {
    setEditmode(true);
  };
  const enableeditmode = () => {
    setEditmode(false);
  };
  const Saveform  = () => {
   // setSavingform(true);
  };
  const auth = useAuth();
  console.log(auth.user);
  return (
    <div className={styles.settings}>
      <div className={styles.imagecontainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/236/236831.png"
          alt="profilepic"
          className={styles.userDp}
        />
      </div>

      <form>
        <div className={styles.field}>
          <div className={styles.fieldName}>Email</div>
          <div className={styles.fieldValue}>{auth.user?.email}</div>
        </div>

        <div className={styles.field}>
          <div className={styles.fieldName}>Name</div>
          {editmode ? (
            <div>
              <input
                type="text"
                className={styles.field}
                value={auth.user?.name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
          ) : (
            <div className={styles.field}>{auth.user?.name}</div>
          )}
        </div>
        {editmode && (
          <div>
            <div className={styles.field}>
              <div className={styles.fieldName}>Password</div>
              <div className={styles.fieldValue}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.fieldName}>Confirm Password</div>
              <div className={styles.fieldValue}>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirm_password}
                  onChange={(e) => SetConfirm_password(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
        )}
        <div className={styles.btnGrp}>
        { editmode ?( <>
            <div className={styles.btn}>
          <button className={styles.saveBtn}  onClick={Saveform}>
            {savingform ? "Saving form..." : "Save"}
           
          </button>
          <button
            className={styles.gobackbtn}
            onClick={enableeditmode}>
            Go back
          </button>
        </div>
        </>) : (
        <div>
        <button
          className={styles.editBtn}
          onClick={disablededitmode} >
          Edit Profile
        </button>
      </div>
       )}
       </div>
      </form>
    </div>
  );
};
export default Settings;
//className= {styles.}
