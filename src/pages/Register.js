import { useState } from "react";
import { useAuth } from "../hooks";
import styles from "../styles/login.module.css";
import { useNavigate} from "react-router-dom";


const Register = () => {
    const [email,SetEmail] = useState("");
    const [name,SetName] = useState('');
    const [password,SetPassword] = useState('');
    const [confirm_password,SetConfirm_password] = useState('');
    const [signingup,SetSigningup] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

   // console.log(navigate);
    const handleSubmit =async(e) => {
        e.preventDefault(); 
        SetSigningup(true);
        let error = false;
        console.log(name+" "+password+" "+confirm_password+" "+email);
        if(!name || !password || !confirm_password || !email ){
            console.log("please fillup all the filed values");
            error = true;
        }
    if(password !== confirm_password){
        console.log(password+" "+confirm_password+" "+"Password and confirm password is not matching");
        error = true;
    }
    if(error){
        return SetSigningup(false);
    }
    const response =await auth.signup(email,name, password,confirm_password);
    if(response.success){
      navigate('/login');
        SetSigningup(false);
        console.log("Login plz");
    }
    else{
        console.log("error");
    }
}
if(auth.user){
  return navigate("/");
}
  return (
    <form className={styles.Formpage} onSubmit = {handleSubmit} >
      <div className={styles.Heading}>
        <span>Signup</span>
      </div>
      <div className={styles.field}>
        <input placeholder="Name" value={name} 
        onChange ={(e) => SetName(e.target.value)} ></input>
      </div>
      <div className={styles.field}>
        <input placeholder="Email" value={email} 
        onChange ={(e) => SetEmail(e.target.value)} ></input>
      </div>
      <div className={styles.field}>
        <input type="password" placeholder="Password" value={password}
        onChange = {(e) => SetPassword(e.target.value)}></input>
      </div>
      <div className={styles.field}>
        <input type="password" placeholder="Confirm Password" value={confirm_password}
        onChange = {(e) => SetConfirm_password(e.target.value)}></input>
      </div>
      <div className={styles.field} >
        <button type="submit" disabled ={SetSigningup} > {signingup ? "signing in.." : "Singup"}</button>
      </div>
    </form>
  );
};
export default Register;