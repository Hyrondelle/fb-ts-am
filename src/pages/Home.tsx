import { useEffect, useState} from 'react';
import Post from '../components/Post';
import { getDocs, collection, doc ,setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import Nav from '../components/Nav';

const Home = () => {
    const [post,setPost] = useState<string>('');
    const [listPost,setListPost] = useState<Array<any>>([]);
    const postCollectionRef = collection(db,"posts");
    const idUser:any = localStorage.getItem('userId');

    const sendPost = async (e:any) => {
        e.preventDefault();
        const userRef = doc(db,'users',idUser);
        await getDoc(userRef)
        .then((userResp:any)=>{
            console.log(userResp);
            const user = userResp.data();
            const pseudoResp = user.pseudo;
            const idRep = user.userId
            setDoc(doc(postCollectionRef,idRep+post[0]+post[1]),{message:post,
                id:idRep+post[0]+post[1],
                likes:0,
                idLikes:[],
                nbComments:0,
                comments:[],
                date:new Date,
                author:{pseudo:pseudoResp, id: idRep}})
            .then(()=>{  
                console.log("post envoyé"); 
                setPost('');
            })
            .catch((err:any)=>{
            console.log(err);
            })
        })
        .catch((err:any)=>{
            console.log(err);
            
        })
    }
    useEffect(()=>{
        const getPostList = async () => {
            const data = await getDocs(postCollectionRef);
            setListPost(data.docs);
            
        }
        getPostList();
    },[listPost, postCollectionRef])
    
    return (
        <div className='home'>
            <Nav/>
            <form className='newMessage' onSubmit={sendPost}>
                <label className='form-lab' htmlFor="post">nouveau message:</label>
                <textarea className='form-text' autoFocus onChange={(e)=>setPost(e.target.value)}  
                       name="post" 
                       id="post" 
                       value={post}/>
                <button className='form-btn' type="submit">Envoyer</button>
            </form>
            <ul className='posts'>
                {
                    listPost.map((post)=><Post post={post.data()} key={post.id}/>)
                }
            </ul>
        </div>
    );
};

export default Home;