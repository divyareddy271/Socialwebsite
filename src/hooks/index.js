import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { login as userLogin  } from "../api";
import {register, editprofile } from "../api";
import { getItemfromLocalStorage, LocalStorage_Token_Key, removeItemfromLocalStorage, SetItemonLocalStorage } from "../utils";
import jwt from "jwt-decode";
import jwtDecode from "jwt-decode";

export const useAuth = () => {
    return useContext(AuthContext);
}

export const useProvideAuth = () => {
    const [user, setUser] = useState();
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        const userToken = getItemfromLocalStorage(LocalStorage_Token_Key);
    
        if (userToken) {
          const user = jwt(userToken);
         
          setUser(user);
          console.log("refreshed",user.email+"  "+userToken)
        }
    
        setLoading(false);
      }, []);
    //const []=useState(null);
    const signup=async(email,name, password,confirm_password) =>{
        const response = await register(email,name, password,confirm_password);
        
        if(response.success){
            setUser(response.data.user);
            return{
                success:true
            }
        }else{
            setUser(null);
            return{
                success:false,
                message:response.message,
            }
        }
    };
    const login=async  (email,password) =>{
        const response = await userLogin(email,password);
        
        if(response.success){
            setUser(response.data.user);
            SetItemonLocalStorage(LocalStorage_Token_Key,  response.data.token ? response.data.token : null);
            return{
                success:true
            }
        }else{
            setUser(null);
            return{
                success:false,
                message:response.message,
            }
        }
    };
    const updateProfile = async(id, password,confirm_password,name) =>{
        console.log("Update Ptofile");
        const response = await editprofile (id, password,confirm_password, name);
        console.log("resposne",response);
        if(response.success){
            setUser(response.data.user);
            SetItemonLocalStorage(LocalStorage_Token_Key,  response.data.token ? response.data.token : null);
            return{
                success:true
            }
        }else{
            setUser(null);
            return{
                success:false,
                message:response.message,
            }
        }

    }
    const logout= () =>{
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
    }
    
};