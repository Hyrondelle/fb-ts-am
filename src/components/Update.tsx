import axios from 'axios';
import React, { useState,useContext } from 'react';
import{ClickContext} from './Post';
import { nbPostsContext } from '../pages/Home';

const Update = (props:any) => {
    const click:any = useContext(ClickContext);
    const nbPosts:any = useContext(nbPostsContext);
    const [post,setPost] = useState<string>();
    const Post = props.fullPost;
    
    const toggleStyleBtn = () =>{
        click.setClick(false);
    }
    const submitChange = async() =>{
        const idPost = props.fullPost._id
        Post.message = post;
        await axios.put('http://localhost:3000/api/post'+idPost,Post)
        .then((res)=>click.setClick(false))
        .catch((e)=>console.log(e))
    }
    const deletePost = async() =>{
        const idPost = props.fullPost._id
        Post.message = post;
        await axios.delete('http://localhost:3000/api/post'+idPost)
        .then((res)=>nbPosts.setNbPosts(-1))
        .catch((e)=>console.log(e))
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