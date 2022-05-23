import { useAuth } from "../hooks";
import styles from "../styles/home.module.css";
import { fetchfriends } from "../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Friendslist = () => {
  const [friendname, setFriendname] = useState([]);
  const auth = useAuth();
  useEffect(() => {
    const fetchfriendslist = async () => {
      const response = await fetchfriends();
      let friendships = [];
      if (response.success) {
        friendships = response.data.friends;
        console.log("friends ", friendships);
        //setUser(response.data.user);
      } else {
        friendships = [];
      }
      setFriendname(friendships);
      //console.log("detaisl",response.message);
    };
    fetchfriendslist();
  }, []);
  // fetchfriends
  // const friendship = auth.user.friendships;
  //const friendsname1 = friendship;
  // setFriendname(friendsname1);
  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>
        <span> Friends </span>
      </div>
      {friendname && friendname.length === 0 && (
        <div className={styles.noFriends}>NO friends found!</div>
      )}
       {friendname && 
       friendname.map((frienddetails) => (
          <div key={`frienddetails-${frienddetails._id}`}>
          <Link className={styles.friendsItem} 
          to={`/user/${frienddetails.to_user._id}`}>
            <div className={styles.friendsImg}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/236/236831.png"
                alt=""
              />
            </div>
            <div className={styles.friendsName}>{frienddetails.to_user.email}</div>
          </Link>
          </div>      
        ))}
    </div>
  );
};

export default Friendslist;
