import { useState } from "react";
import styles from "../styles/home.module.css"
import {useAuth} from "../hooks"
const Createposts =()=> {
    const auth = useAuth();
    const [posts,setPosts] = useState("");
    const[addingpost, setAddingpost] = useState(false);
    const handlepost =async (e) => {
        e.preventDefault();
        setAddingpost(true);
        const response = await auth.postcreationhook(posts);
         console.log(response);
        if(response.success){
            setPosts('');
            console.log("post posted successfully");
            return;
        }
        else{
            console.log("Error"); 
            return;
        }
    }
    return (<>
        {auth.user && 
      (<div className={styles.createpost}>
            <div  className={styles.createpostcontent}>
                <textarea value = {posts} onChange = {(e) => setPosts(e.target.value)}></textarea>
            </div>
            <div className={styles.postbutton} >
            <button onClick={handlepost} className={styles.addpostbtn} >Add post</button>
        </div>
        </div>
        )
        }
        </>
    )
}
export default Createposts;