import { useState } from "react";
import styles from "../styles/login.module.css";
//import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [loggingIn, setLoggingIn]= useState(false);
  // const {addToast} = useToasts();
    const handleSubmit =(e) => {
        e.preventDefault();
        
    setLoggingIn(true);
    
}
  return (
    <form className={styles.Formpage} onSubmit = {handleSubmit}>
      <div className={styles.Heading}>
        <span>Log In</span>
      </div>
      <div className={styles.field}>
        <input placeholder="Email" value={email} 
        onChange ={(e) => setEmail(e.target.value)}  required></input>
      </div>
      <div className={styles.field}>
        <input type="password" placeholder="Password" value={password}
        onChange = {(e) => setPassword(e.target.value)} required></input>
      </div>
      <div className={styles.field} disabled = {loggingIn}>
        <button type="submit">{loggingIn ? 'Logging in...':'Log In'
        }</button>
      </div>
    </form>
  );
};
export default Login;

 