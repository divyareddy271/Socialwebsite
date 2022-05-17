import { useState } from "react";
import styles from "../styles/login.module.css";
import { useNavigate } from "react-router";
//import { toast } from 'react-toastify';
import { useAuth } from "../hooks";
const Login = () => {
  const navigate = useNavigate();
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [loggingIn, setLoggingIn]= useState(false);
  // const {addToast} = useToasts();
  const auth = useAuth();
  console.log(auth);
    const handleSubmit =async(e) => {
        e.preventDefault();   
    setLoggingIn(true);
    if(!email || !password){
        console.log("error");
    }
    const response = await auth.login(email,password);
    if(response.success){

        console.log("Success");
    }
    else{
        console.log("error  "+ response.message);
    }
    setLoggingIn(false);
}
if(auth.user){
 navigate("/");
}


  return (
    <form className={styles.Formpage} onSubmit = {handleSubmit}>
      <div className={styles.Heading}>
        <span>Log In</span>
      </div>
      <div className={styles.field}>
        <input placeholder="Email" value={email} 
        onChange ={(e) => setEmail(e.target.value)} ></input>
      </div>
      <div className={styles.field}>
        <input type="password" placeholder="Password" value={password}
        onChange = {(e) => setPassword(e.target.value)}></input>
      </div>
      <div className={styles.field} >
        <button disabled = {loggingIn} type="submit">{loggingIn ? 'Logging in...':'Log In'
        }</button>
      </div>
    </form>
  );
};
export default Login;

 