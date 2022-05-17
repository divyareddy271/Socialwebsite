import propTypes from "prop-types";
import { useEffect, useState } from 'react';
//to validate props
import styles from '../styles/home.module.css';
import  Loader  from '../components/Loader';
import { getPosts } from '../api';
import { Link } from "react-router-dom";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);
  if(loading){
    return <Loader />
  }
  return (
    <div className={styles.postList}>
     {posts.map((post) => (
       <div className={styles.postComponent} key={`post-${post._id}`}>
        <div className={styles.postDetails}>
          <div className={styles.PostProfile}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/236/236831.png"
              alt="Profile"
            />
            <div className={styles.ProfileName}>
            <Link to={ `/user/${post.user._id}`}
                  state={{user: post.user}}
                
              className={styles.postAuthor}>{post.user.name}</Link>

              <span className={styles.postTime}>a minute ago</span>
            </div>
          </div>
          <div className={styles.postContent}>
            <span>{post.content}</span>
          </div>
        </div>
        <hr></hr>
        <div className={styles.likeComment}>
          <img src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png" />
          <span>5</span>
          <img src="https://t4.ftcdn.net/jpg/01/09/34/83/240_F_109348365_Z8PhLswPi5USmZxOyH31cpNVspCHfoD5.jpg"></img>
          <span>2</span>
        </div>
        <hr></hr>
        <div className={styles.postCommentBox}>
          <input
            id="commentbox"
            placeholder="Start typing a comment"
          />
        </div>
        <div className={styles.postCommentsList}>
            <div className={styles.postCommentsItem}>
                <div className={styles.postCommentHeader}>
                    <span className={styles.postCommentAuthor}>Bill </span>
                    <span className={styles.postCommentTime}> a minute ago </span>
                    <span className={styles.postCommentLikes}>22</span>
                </div>
                <div>
                    <span className={styles.postCommentContent}>Random comments</span>
                </div>
            </div>
        </div>
        </div>
      ))}
    </div>
  );
};
Home.propTypes = {
  posts:propTypes.array.isRequired,
  //define all props to validate data type
}