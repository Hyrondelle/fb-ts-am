
import {FaPen} from 'react-icons/fa';
import {BiLike, BiSolidLike } from "react-icons/bi";
import { btnUpdate,getUser } from '../Store';
import { useState } from 'react';
import { doc ,updateDoc,collection,arrayUnion,arrayRemove} from 'firebase/firestore';
import { db } from '../firebase.config';

const Post = (props:any) => {
    const {click,toggleBtn}:any = btnUpdate()
    const {id,pseudo}:any = getUser()
    const messagePost = props.post.message
    const fullPost = props.post
    const [changeMessage,setChangeMessage] = useState<string>(messagePost);
    const [addComment,setAddComment] = useState<string>('');
    const postRef = collection(db,'posts');
    const [viewComment,setViewComment] = useState<boolean>(false);

    const modify = () =>{
        toggleBtn(click)
    }
    const viewComments = () =>{
        setViewComment(!viewComment)
    }
    const Likes = async(e:any) =>{
        e.preventDefault();
        if(fullPost.idLikes.includes(id)){
            await updateDoc(doc(postRef,fullPost.id),{idLikes:arrayRemove(id),likes:fullPost.likes-1})
            .then(()=>{  
                console.log("like enlevé");   
            })
            .catch((err:any)=>{
            console.log(err);
            })
        }
        else{
            await updateDoc(doc(postRef,fullPost.id),{idLikes:arrayUnion(id),likes:fullPost.likes+1})
            .then(()=>{  
                console.log("commentaire liké");   
            })
            .catch((err:any)=>{
            console.log(err);
            })
        }
        
    }
        
    const sendNewMessage = async(e:any) =>{
        e.preventDefault();
        await updateDoc(doc(postRef,id+messagePost[0]+messagePost[1]),{message:changeMessage})
            .then(()=>{  
                console.log("post modifié");   
                toggleBtn(click)
            })
            .catch((err:any)=>{
            console.log(err);
            })
    }
    const newComment = async(e:any) =>{
        e.preventDefault();
        if(addComment.length==0){
            console.log('veuillez écrire un commentaire');
        }
        else{
            await updateDoc(doc(postRef,fullPost.id),{comments:arrayUnion({addComment,id,pseudo}),nbComments:fullPost.nbComments+1})
            .then(()=>{  
                console.log("commentaire envoyé");
                setAddComment('')   
            })
            .catch((err:any)=>{
            console.log(err);
            })
        }
        
    }

    return (
        <div className='post'>   
            <div className='author'>{'@'+fullPost.author.pseudo}</div> 
            <div className='post-contain'>
                {(!click||id+messagePost[0]+messagePost[1]!==fullPost.id)?(<div>{messagePost}</div>):
                (<form onSubmit={sendNewMessage}>
                    <textarea defaultValue={messagePost} onChange={(e)=>setChangeMessage(e.target.value)}>
                    </textarea>
                    <button className='btn' type="submit">modifier</button>
                </form>)}
            </div>
            <div className="total">
                <div className="social">
                    <div className='buttons'>
                    <div onClick={Likes} 
                        className='like btn centre'>
                            {fullPost.likes+'.'} {fullPost.idLikes.includes(id)?<BiSolidLike/>:<BiLike/>}</div>
                    <div className='comment btn centre'
                        onClick={viewComments}>{fullPost.nbComments} comments</div>
                    <div className='partage btn centre'>partage</div>
                    {(id===fullPost.author.id)?(<button className={fullPost.id} onClick={modify}><FaPen/></button>):(<div></div>)}
                    </div>
                </div> 
                <div className='align-comments'>
                    <form onSubmit={newComment}>
                    <label htmlFor="comments">commenter</label>
                    <input type="text" 
                    name="comments" 
                    id="comments" 
                    value={addComment}
                    onChange={(e)=>setAddComment(e.target.value)} />
                    <button className='btn' type="submit">comment</button>
                    </form>
                </div>
                {viewComment?
                <ul className='commentaires'>
                {
                    fullPost.comments
                    .map((comment:any)=>
                    <li key={comment.id}><div>{'@'+comment.pseudo}</div><div>{comment.addComment}</div></li>)
                }
                </ul>:<></>}
            </div>         
        </div>
    );
};


 
export default Post;

     
     

 