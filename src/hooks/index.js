import { useContext, useState, useEffect } from "react";
import { AuthContext, PostsContext } from "../providers";
import jwt from "jwt-decode";
import {
  register,
  editprofile,
  login as userLogin,
  fetchfriends,
  postCreation,
  getPosts,
  ToggleLike,
  createcomment,
} from "../api";
import {
  getItemfromLocalStorage,
  LocalStorage_Token_Key,
  removeItemfromLocalStorage,
  SetItemonLocalStorage,
} from "../utils";


export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState();
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemfromLocalStorage(LocalStorage_Token_Key);
      //  console.log("Userrere",userToken);
      if (userToken) {
        const user = jwt(userToken);
        const response = await fetchfriends();
        let friendships = [];
        if (response.success) {
          friendships = response.data.friends;
          console.log("friends ", friendships);
          //setUser(response.data.user);
        } else {
          friendships = [];
        }
        setUser({
          ...user,
          friendships,
        });
      }
      setLoading(false);
    };
    getUser();
    
  }, []);
  //const []=useState(null);
  const signup = async (email, name, password, confirm_password) => {
    const response = await register(email, name, password, confirm_password);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data.user);
      SetItemonLocalStorage(
        LocalStorage_Token_Key,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  const updateProfile = async (id, password, confirm_password, name) => {
    console.log("Update Ptofile");
    const response = await editprofile(id, password, confirm_password, name);
    console.log("resposne", response);
    if (response.success) {
      setUser(response.data.user);
      SetItemonLocalStorage(
        LocalStorage_Token_Key,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  const updateuserdetails = (isaddfriend, friend) => {
    if (isaddfriend) {
      setUser({
        ...user,
        friendships: [...user.friendships, friend],
      });
      return;
    } else {
      const newFriends = user.friendships.filter(
        (f) => f.to_user._id !== friend.to_user._id
      );

      setUser({
        ...user,
        friends: newFriends,
      });
    }
  };
  const logout = () => {
    setUser(null);
    removeItemfromLocalStorage(LocalStorage_Token_Key);
  };

  return {
    user,
    login,
    logout,

    Loading,
    signup,
    updateProfile,
    //  addfriendtolist,
    updateuserdetails,
    //  fetchfriendslist,
  };
};
export const usePosts = () => {
  return useContext(PostsContext);
};
export const useProvidePosts = () => {
  const [posts, setPosts] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
     // console.log("response res", response);
      if (response.success) {
        setPosts(response.data.posts);
        console.log("response", response.data.posts);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);
  const commentaddition = async (postid,comment) => {
    const response = await createcomment(postid,comment);
    if(response.success){
      console.log("added");
      const newcomment = posts.map((post) => {
        if(post._id === postid){
          return {...post, comments: [...post.comments,response.data.comment]}
          
        }
        return post;
      })
       
      setPosts(newcomment);
      console.log("mmm",posts);
      return {
        success: true,
      };
    
    } else {
      
      return {
        success: false,
        message: response.message,
      };
    }
  }
  const postcreationhook = async (content) => {
    const response = await postCreation(content);
    const newpost = [response.data.post, ...posts];
    console.log(newpost);
    if (response.success) {
      setPosts(newpost);
      return {
        success: true,
      };
    } else {
    
      return {
        success: false,
        message: response.message,
      };
    }
  };
  const postcommenttogglelike = async (itemid,itemtype) => {
    const response = await ToggleLike(itemid,itemtype);
    console.log("Posts like",response.data);
    if (response.success) {
      
      return {
        success: true,
      };
    } else {
    
      return {
        success: false,
        message: response.message,
      };
    }
  }

  return {
    data: posts,
    Loading,
    postcreationhook,
    commentaddition,
    postcommenttogglelike
  };
};
