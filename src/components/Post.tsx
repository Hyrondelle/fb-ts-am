
import {FaPen} from 'react-icons/fa';
import {BiLike, BiSolidLike } from "react-icons/bi";
import { btnUpdate,getUser } from '../Store';
import { useState } from 'react';
import { doc ,updateDoc,collection,arrayUnion} from 'firebase/firestore';
import { db } from '../firebase.config';

const Post = (props:any) => {
    const {click,toggleBtn}:any = btnUpdate()
    const {id}:any = getUser()
    const messagePost = props.post.message
    const fullPost = props.post
    const [changeMessage,setChangeMessage] = useState<string>(messagePost);
    const [addComment,setAddComment] = useState<string>('');
    const postRef = collection(db,'posts');

    const modify = () =>{
        toggleBtn(click)
    }
    
    const Likes = async(e:any) =>{
        e.preventDefault();
        if(fullPost.idLikes.includes(id)){
            console.log('déja liké');
        }
        else{
            await updateDoc(doc(postRef,fullPost.id),{idLikes:arrayUnion(id),likes:fullPost.likes+1})
            .then(()=>{  
                console.log("commentaire liké");   
                toggleBtn(click)
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
        await updateDoc(doc(postRef,fullPost.id),{comments:arrayUnion(addComment),nbComments:fullPost.nbComments+1})
            .then(()=>{  
                console.log("commentaire envoyé");   
                toggleBtn(click)
            })
            .catch((err:any)=>{
            console.log(err);
            })
    }

    return (
        <div className='post'>    
            <div className='post-contain'>
                {(!click||id+messagePost[0]+messagePost[1]!==fullPost.id)?(<div>{messagePost}</div>):
                (<form onSubmit={sendNewMessage}>
                    <textarea defaultValue={messagePost} onChange={(e)=>setChangeMessage(e.target.value)}>
                    </textarea>
                    <button className='btn' type="submit">modifier</button>
                </form>)}
            </div>
            <div className="social">
                <div className="total">
                    <div className='like btn'>{'@'+fullPost.author.pseudo}</div>
                    <div className='btn_x2'>
                        <div className='comment btn'>nbcomment</div>
                        <div className='partage btn'>nbpartage</div>
                    </div>
                </div>
                <div className='buttons'>
                    <div onClick={Likes} 
                        className='like btn centre'>
                            {fullPost.likes+'.'} {fullPost.idLikes.includes(id)?<BiSolidLike/>:<BiLike/>}</div>
                    <div className='comment btn centre'>{fullPost.nbComments} comments</div>
                    <div className='partage btn centre'>partage</div>
                    {(id===fullPost.author.id)?(<button className={fullPost.id} onClick={modify}><FaPen/></button>):(<div></div>)}
                </div>
                <div className='align-comments'>
                    <form onSubmit={newComment}>
                    <label htmlFor="comments">commenter</label>
                    <input type="text" name="comments" id="comments" onChange={(e)=>setAddComment(e.target.value)} />
                    <button className='btn' type="submit">comment</button>
                    </form>
                </div>
            </div>          
        </div>
    );
};


 
export default Post;

     
     

 