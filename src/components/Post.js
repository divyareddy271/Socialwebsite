import propTypes from "prop-types";
import { useEffect, useState } from "react";
//to validate props
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
import { ToggleLike } from "../api";
import Comment from "./Comment";
import { useAuth, usePosts } from "../hooks";

const Post = ({ post }) => {
  const posts = usePosts();
  const [addcomment, setAddcomment] = useState();
  const [creatingcomment, setCreatingcomment] = useState(false);
  const handlecomment = (e) => {
    if (e.key === "Enter") {
      setCreatingcomment(true);
      setAddcomment("");
    const response = posts.commentaddition(post._id, addcomment);
    if(response.success){
      console.log("added comment successfully");
    }
  }
  
  };
  const handletoggelike =async (e) => {
    e.preventDefault();
    const response = await ToggleLike(post._id,"Post");
    
    if(response.success){
      posts.handletoggelike(post._id)
      if(response.data.deleted)
      console.log("Deleted like");
      else{
        console.log("Added like");
      }
    
     
    }
  }
  return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postDetails}>
        <div className={styles.PostProfile}>
          
          <img
            src="https://cdn-icons-png.flaticon.com/128/236/236831.png"
            alt="Profile"
          />
          <div className={styles.ProfileName}>
            <Link to={`/user/${post.user._id}`} className={styles.postAuthor}>
              {post.user.name}
            </Link>

            <span className={styles.postTime}>{post.createdAt}</span>
          </div>
        </div>
        <div className={styles.postContent}>
          <span>{post.content}</span>
        </div>
        <div className={styles.postActions}>
          <div className={styles.postLike}>
          <button onClick={handletoggelike}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
              alt="likes-icon"
            />
            </button>
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://t4.ftcdn.net/jpg/01/09/34/83/240_F_109348365_Z8PhLswPi5USmZxOyH31cpNVspCHfoD5.jpg"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={addcomment}
            onChange={(e) => setAddcomment(e.target.value)}
            onKeyDown={handlecomment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Post;
