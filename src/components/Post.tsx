
import {FaPen} from 'react-icons/fa';
import { btnUpdate,getUser } from '../Store';
import { useState } from 'react';
import { doc ,updateDoc,collection} from 'firebase/firestore';
import { db } from '../firebase.config';

const Post = (props:any) => {
    const {click,toggleBtn}:any = btnUpdate()
    const {id,pseudo}:any = getUser()
    const messagePost = props.post.message
    const fullPost = props.post
    const [changeMessage,setChangeMessage] = useState<string>(messagePost);
    const postRef = collection(db,'posts');
  
    const modify = () =>{
        toggleBtn(click)
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
                    <div className='like btn centre'>like</div>
                    <div className='comment btn centre'>comment</div>
                    <div className='partage btn centre'>partage</div>
                    {(id===fullPost.author.id)?(<button onClick={modify}><FaPen/></button>):(<div></div>)}
                      
                </div>
            </div>          
        </div>
    );
};


 
export default Post;

     
     

 