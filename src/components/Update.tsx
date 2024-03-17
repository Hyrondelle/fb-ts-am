import {useState} from 'react';
import { btnUpdate } from '../Store';

const Update = (props:any) => {
    const [post,setPost] = useState<string>();
    const {click,toggleBtn}:any = btnUpdate()
    const Post = props.fullPost;
    
    const toggleStyleBtn = () =>{
        toggleBtn(click)
    }
    const submitChange = async() =>{
        const idPost = props.fullPost._id
        Post.message = post;
    }
    const deletePost = async() =>{
        const idPost = props.fullPost._id
        Post.message = post;
    }
     return (
         <div className='update' id='updateEl'>
             
             <input onChange={(e)=>setPost(e.target.value)} autoFocus type="text" name="update" id="update" defaultValue={props.fullPost.message}/>
             <button onClick={submitChange} type="submit">modifier</button>
             <button onClick={deletePost} type="submit">supprimer</button>
             <button onClick={toggleStyleBtn}>X</button>
         </div>
     );
 };
 export default Update;