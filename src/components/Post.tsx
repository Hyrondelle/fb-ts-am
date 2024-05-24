
import {FaPen} from 'react-icons/fa';
import {BiLike, BiSolidLike } from "react-icons/bi";
import { UserType, getUser } from '../Store';
import { useState } from 'react';
import { getStorage, ref,getDownloadURL } from "firebase/storage";
import { doc ,updateDoc,collection,arrayUnion,arrayRemove,deleteDoc, DocumentData} from 'firebase/firestore';
import { db } from '../firebase.config';

const Post = (props:DocumentData) => {
    const {id,pseudo}:UserType = getUser()
    const storage = getStorage();
    const messagePost = props.post.message
    const fullPost = props.post
    const [click,setClick] = useState<boolean>(false);
    const [changeMessage,setChangeMessage] = useState<string>(messagePost);
    const [addComment,setAddComment] = useState<string>('');
    const postRef = collection(db,'posts');
    const [viewComment,setViewComment] = useState<boolean>(false);
    const [photo,setPhoto] = useState<string>('');
    
    if(fullPost.photo){
        getDownloadURL(ref(storage, 'photos/'+fullPost.id+'/'+fullPost.id+'.jpg'))
        .then((url) => {
            setPhoto(url)
        })
    }

    const modify = () =>{
        setClick(!click)
    }
    const viewComments = () =>{
        setViewComment(!viewComment)
    }
    const Likes = async(e:React.MouseEvent<HTMLInputElement>) =>{
        e.preventDefault();
        if(fullPost.idLikes.includes(id)){
            await updateDoc(doc(postRef,fullPost.id),{idLikes:arrayRemove(id),likes:fullPost.likes-1})
            .then(()=>{  
                console.log("like enlevé");   
            })
            .catch((err:string)=>{
            console.log(err);
            })
        }
        else{
            await updateDoc(doc(postRef,fullPost.id),{idLikes:arrayUnion(id),likes:fullPost.likes+1})
            .then(()=>{  
                console.log("commentaire liké");   
            })
            .catch((err:string)=>{
            console.log(err);
            })
        }
        
    }
        
    const sendNewMessage = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        await updateDoc(doc(postRef,id+messagePost[0]+messagePost[1]),{message:changeMessage})
            .then(()=>{  
                console.log("post modifié");   
                setClick(!click)
            })
            .catch((err:string)=>{
            console.log(err);
            })
    }
    const deletePost = async(e:React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        await deleteDoc(doc(postRef,id+messagePost[0]+messagePost[1]))
            .then(()=>{  
                console.log("post effacé");   
            })
            .catch((err:string)=>{
            console.log(err);
            })
    }
    const newComment = async(e:React.FormEvent<HTMLFormElement>) =>{
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
            .catch((err:string)=>{
            console.log(err);
            })
        }
        
    }

    return (
        <div className='post'>   
            <div aria-label='author' className='author'>{'@'+fullPost.author.pseudo}</div> 
            {fullPost.photo?<img src={photo} className='photopost'></img>:<></>}
            <div className='post-contain'>
                {(!click||id+messagePost[0]+messagePost[1]!==fullPost.id)?(<div>{messagePost}</div>):
                (<form onSubmit={sendNewMessage}>
                    <textarea defaultValue={messagePost} 
                        className='changeMsg'
                        onChange={(e)=>setChangeMessage(e.target.value)}>
                    </textarea>
                    <div>
                        <button className='btn' aria-label='modify post' type="submit">modifier</button>
                        <button className='btn' aria-label='delete post' onClick={deletePost}>effacer</button>
                    </div>
                </form>)}
            </div>
            <div className="total">
                <div className="social">
                    <div className='buttons'>
                    <div onClick={Likes} 
                        className='like btn centre'>
                            {fullPost.likes+' '} {fullPost.idLikes.includes(id)?<BiSolidLike aria-label='like'/>:<BiLike aria-label='unlike'/>}</div>
                    <div className='comment btn centre'
                        onClick={viewComments}>{fullPost.nbComments} comments</div>
                    <div className='partage btn centre'>partage</div>
                    {(id===fullPost.author.id)?(<button className='btn-modif' 
                        aria-label='modify or delete post'
                        onClick={modify}><FaPen/></button>):(<div></div>)}
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
                    <button className='btn' aria-label='add commentary' type="submit">comment</button>
                    </form>
                </div>
                {viewComment?
                <ul className='commentaires'>
                {
                    fullPost.comments
                    .map((comment:DocumentData)=>
                    <li key={comment.id}><div>{'@'+comment.pseudo}</div><div>{comment.addComment}</div></li>)
                }
                </ul>:<></>}
            </div>         
        </div>
    );
};


 
export default Post;

     
     

 