import { useState } from "react";
import { useAuth } from "../hooks";
import styles from "../styles/settings.module.css";

const Settings = () => {
  const auth = useAuth();

 // const [userid, setUserid] = useState(auth.user?._id ? auth.user?._id : "");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(auth.user?.name ? auth.user?.name : "");
  const [confirm_password, SetConfirm_password] = useState("");
  const [editmode, setEditmode] = useState(false);
  const [savingform, setSavingform] = useState(true);

  const SaveForm = async (e) => {
    e.preventDefault();

    setSavingform(false);
    console.log(savingform);
    const userid  = auth.user?._id;
    console.log("Hello");

    let error = true;
    if (!name || !password || !confirm_password) {
      console.log("please fillup all the filed values");
      error = false;
    }
    if (password !== confirm_password) {
      console.log(
        password +
          " " +
          confirm_password +
          " " +
          "Password and confirm password is not matching"
      );
      error = false;
    }
    if (error) {
   setSavingform(true);
    }
    console.log("helloworld");
    console.log(userid + " " + name + " " + password + " " + confirm_password);
    const response = await auth.updateProfile(userid,password,confirm_password,name);
    
    if (response.success) {
      // setSavingform(true);
      console.log("Updated the deatials successfully");
    } else {
      console.log("error");
    }
  };

  return (
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
          <div className={styles.fieldValue}>{auth.user?.email}</div>
        </div>

        <div className={styles.field}>
          <div className={styles.fieldName}>Name</div>
          {editmode ? (
            <div>
              <input
                type="text"
                className={styles.field}
                value={name}
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
          {editmode ? (
            <>
              <div className={styles.btn}>
                <button className={styles.saveBtn} onClick={SaveForm}>
                  {savingform ? "Save" : "Saving form..."}
                </button>
                <button
                  className={styles.goBack}
                  onClick={() => setEditmode(false)}
                >
                  Go back
                </button>
              </div>
            </>
          ) : (
            <div>
              <button
                className={styles.editBtn}
                onClick={() => setEditmode(true)}>
                Edit Profile
              </button>
            </div>
          )}
        </div>

    </div>
  );
};
export default Settings;
//className= {styles.}
