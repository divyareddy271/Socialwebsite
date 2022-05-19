//import styles from "../styles/userprofile.module.css"
import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { userinformation, addfriend } from "../api";

/*import { useLocation } from "react-router-dom";
const location = useLocation();
    const auth = useAuth();
    console.log(location);*/
  


const Userprofile = () => {
    const auth = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userprofile, setUserprofile] = useState({});
  const [loading, setLoading] = useState(true);
  const [isfriend, setIsfriend]= useState(false);
  const [requestinprogress, setRequestinprogress] = useState(false);
  //  const location = useLocation();
  //  console.log(location);
  useEffect(() => {
    const fetchUserprofile = async () => {
      const response = await userinformation(userId);

      if (response.success) {
        setUserprofile(response.data.user);
      } else {
        console.log("error in fetching friend's profile");
        navigate("/");
      }
      setLoading(false);
    };
    fetchUserprofile();
  }, [userId, navigate]);


  /*const Isuserafriend=()=>{
       const friends = auth.user.friendships;
        const index = friends.map(friend => friend.to_user._id);
        index.map((indexes) =>{
            if(indexes == userId){
                console.log(indexes);
            return setIsfriend(true);}
            console.log(indexes);
        })*/

  //const isfriendexist = Isuserafriend();
  //console.log(userId);
  const handleaddfriend = async () => {
    setRequestinprogress(true);
    const response = await addfriend (userId);
    const { friend } = response.data;
    console.log("userupdte - 1",response.data);
    if (response.success) {
      auth.updateuserdetails(true, friend);
    } else {
      console.log("error in fetching friend's profile");
      setRequestinprogress(false);
    }
  };
  const removefriend = () => {};
   if (loading) {
    return <Loader />;
  }

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
        <div className={styles.fieldValue}>{userprofile.email}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldName}>Name</div>
        <div className={styles.fieldValue}>{userprofile.name}</div>
      </div>
      <div className={styles.btnGrp}>
        {isfriend ? (
          <div className={styles.btn}>
            <button className={styles.saveBtn} onClick={removefriend}>
              Rempove Friend
            </button>
          </div>
        ) : (
          <div className={styles.btn}>
            <button className={styles.saveBtn} onClick={handleaddfriend}
            disabled = {requestinprogress}>
                {requestinprogress ? "Adding friend" : "Add Friend"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Userprofile;
