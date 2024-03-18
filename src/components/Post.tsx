
import {FaPen} from 'react-icons/fa';
import Update from './Update';
import { btnUpdate,getUser } from '../Store';

const Post = (props:any) => {
    const {click,toggleBtn}:any = btnUpdate()
    const {id}:any = getUser()
    const messagePost = props.post.message
    const fullPost = props.post
  
    const modify = () =>{
        toggleBtn(click)
    }

    return (
        <div className='post'>    
            <div className='post-contain'>
                <div>{messagePost}</div>
            </div>
            <div className="social">
                <div className="total">
                    <div className='like btn'>nblike</div>
                    <div className='btn_x2'>
                        <div className='comment btn'>nbcomment</div>
                        <div className='partage btn'>nbpartage</div>
                    </div>
                </div>
                <div className='buttons'>
                    <div className='like btn centre'>like</div>
                    <div className='comment btn centre'>comment</div>
                    <div className='partage btn centre'>partage</div>
                    {(id===fullPost.author.id)?(<button onClick={modify} className='modify'><FaPen/></button>):(<div></div>)}
                      
                </div>
            </div>          
        </div>
    );
};


 
export default Post;

     
     

 