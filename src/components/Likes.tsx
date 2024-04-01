import {doc , updateDoc, collection } from "firebase/firestore";
import { db } from '../firebase.config';

const Likes = (post:any) => {
    const postRef = collection(db,'posts');

    updateDoc(doc(postRef,post.id),{likes:post.likes+1})
        .then(()=>{  
            console.log("post liké");   
            
        })
        .catch((err:any)=>{
            console.log(err);
        })
    return (
        <div>
            
        </div>
    );
};

export default Likes;

