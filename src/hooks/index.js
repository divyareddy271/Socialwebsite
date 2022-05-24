import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { login as userLogin } from "../api";
import { register, editprofile, addfriend, fetchfriends,postCreation } from "../api";
import {
  getItemfromLocalStorage,
  LocalStorage_Token_Key,
  removeItemfromLocalStorage,
  SetItemonLocalStorage,
} from "../utils";
import jwt from "jwt-decode";
import jwtDecode from "jwt-decode";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState();
  const [Loading, setLoading] = useState(true);
  const [posts,setPosts] = useState(); 
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
        console.log("refreshed", user.email + "  " + userToken);
      }
    };
    getUser();
    setLoading(false);
  }, []);
  //const []=useState(null);
  const signup = async (email, name, password, confirm_password) => {
    const response = await register(email, name, password, confirm_password);

    if (response.success) {
      setUser(response.data.user);
      return {
        success: true,
      };
    } else {
      setUser(null);
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
      setUser(null);
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
      setUser(null);
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
    }
    else{
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
   const postcreationhook = async (content) => {
   const response = await postCreation(content);
   console.log(response);
   if(response.success){
    setPosts(response.data.post);
    return {
      success: true,
    };
  } else {
    setUser(null);
    return {
      success: false,
      message: response.message,
    };
   }
   }

  return {
    user,
    login,
    logout,
    postcreationhook,
    Loading,
    signup,
    updateProfile,
  //  addfriendtolist,
    updateuserdetails,
    //  fetchfriendslist,
  };
};
