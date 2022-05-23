//import styles from "../styles/userprofile.module.css"
import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { userinformation, addfriend,removefriendship } from "../api";

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
    const Isuserafriend=()=>{
      const friends = auth.user.friendships;
       const Friendsid = friends.map((friend) => friend.to_user._id);
      const index= Friendsid.indexOf(userId);
      if(index!=-1){
        setIsfriend(true);
      }
     }
     Isuserafriend();
    fetchUserprofile();
  }, [userId, navigate]);

     

  //const isfriendexist = Isuserafriend();
  //console.log(userId);
  const handleaddfriend = async () => {
    setRequestinprogress(true);
    const response = await addfriend (userId);
    const { friend } = response.data;
    console.log("userauth",auth.user.friendships);
    if (response.success) {
      auth.updateuserdetails(true, friend);
     
        setIsfriend(true);
      setRequestinprogress(false);
      return;
    } else {
      console.log("error in fetching friend's profile");
      setRequestinprogress(false);
    }
  };
  const handleremovefriend =async () => {
    setRequestinprogress(true);
    const response = await removefriendship (userId);
   
    if (response.success) {
      console.log(auth);
      const friends= auth.user.friendships.filter(
        (friend) => friend.to_user._id === userId
        );
      console.log("friends :  ", friends);
    //  const index= Friendsid.indexOf(friend);
      auth.updateuserdetails(false, friends[0]);
     
    } else {
      console.log("error in fetching friend's profile");
    }
      setIsfriend(false);
      setRequestinprogress(false);
  };
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
            <button className={styles.saveBtn} onClick={handleremovefriend} 
            disabled = {requestinprogress}>
                {requestinprogress ? "Removing friend" : "Remove Friend"}
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
