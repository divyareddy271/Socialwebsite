import propTypes from "prop-types";
import { useEffect, useState } from "react";
//to validate props
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";


import Loader from "../components/Loader";
import Post from "../components/Post";
import Comment from "../components/Comment";
import Friendslist from "../components/Friendslist";
import { useAuth, usePosts } from "../hooks";
import  Createposts  from "../components/Createposts";

export const Home = () => {
  const[addcomment,setAddcomment] = useState(); 

  const[postid,setPostid] = useState();
  const auth = useAuth();
  const posts = usePosts();
  
  if (posts.loading) {
    return <Loader />;
  }
  return (
      <div className={styles.home}>
      <div className={styles.postLeft}>
      <Createposts />
        {posts.data.map((post) => (
          <Post post= {post} key ={`post-${post._id}`}/>
        ))}
      
      
    </div>
    {auth.user  && <Friendslist />}
    </div>
  );
};
