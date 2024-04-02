import {doc , updateDoc,arrayUnion } from "firebase/firestore";
import { db } from '../firebase.config';
import { getUser } from "../Store";

const Likes = async (post:any) => {
    const postRef = doc(db,'posts',post.id);
    const {id}:any = getUser();

    await updateDoc(postRef,{idLikes:arrayUnion(id)})
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

