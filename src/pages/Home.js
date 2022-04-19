import "../styles/index.css"
export const Home = () => {
  return (
    <div className="post-component">
     
        <div className="post-details">
          <div className="Post-profile">
            <img
              src="https://cdn-icons.flaticon.com/png/128/1144/premium/1144709.png?token=exp=1650337983~hmac=ad19256b74c5c35eeb7bbd41a60200dc"
              alt="Profile"
            />
            <div className="Profile-name">
              <span className="postAuthor">Aakasj</span>

              <span className="postTime">a minute ago</span>
            </div>
          </div>
          <div className="postContent">
            <span>Post Content</span>
          </div>
        </div>
        <hr></hr>
        <div className="like-comment">
          <img src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png" />
          <span>5</span>
          <img src="https://t4.ftcdn.net/jpg/01/09/34/83/240_F_109348365_Z8PhLswPi5USmZxOyH31cpNVspCHfoD5.jpg"></img>
          <span>2</span>
        </div>
        <hr></hr>
        <div className="postCommentBox">
          <input
            id="commentbox"
            placeholder="Start typing a comment"
          />
        </div>
        <div className="postCommentsList">
            <div className="postCommentsItem">
                <div className="postCommentHeader">
                    <span className="postCommentAuthor">Bill </span>
                    <span className="postCommentTime"> a minute ago </span>
                    <span className="postCommentLikes">22</span>
                </div>
                <div>
                    <span className="postCommentContent">Random comments</span>
                </div>
            </div>
        </div>
      
    </div>
  );
};
