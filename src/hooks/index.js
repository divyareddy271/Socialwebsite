import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { login as userLogin  } from "../api";
import {register} from "../api";

export const useAuth = () => {
    return useContext(AuthContext);
}

export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [Loading, setLoading] = useState(true);
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
    

    const logout= () =>{
        setUser(null);
    };

    return {
        user,
        login,
        logout,
        Loading,
        register,
    }
    
};