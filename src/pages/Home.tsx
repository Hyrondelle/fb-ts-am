import React, { useEffect, useState,createContext,Dispatch } from 'react';
//import axios from 'axios';
import Post from '../components/Post';
import { addDoc,getDocs, collection, doc ,setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
export const nbPostsContext = createContext({});
type nbPosteContextType ={
    nbPosts:number;
    setNbPosts:Dispatch<number>;
    }
const Home = () => {
    const [post,setPost] = useState<string>('');
    const [nbPosts,setNbPosts] = useState<number|nbPosteContextType>(0);
    const [listPost,setListPost] = useState<Array<any>>([]);
    const postCollectionRef = collection(db,"posts");
    const idUser:any = localStorage.getItem('userId');
    
    const title = "premier";

    const sendPost = async () => {
        console.log(idUser);
        
        const userRef = doc(db,'users',idUser);
        await getDoc(userRef)
        .then((userResp:any)=>{
            console.log(userResp);
            
            const emailResp = userResp._document.data.value.mapValue.fields.email
            const idRep = userResp._document.data.value.mapValue.fields.userId
            setDoc(doc(postCollectionRef),{title,message:post,author:{email:emailResp, id: idRep}})
            .then(()=>{  
                console.log("post envoyé");     
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
    },[listPost])
    
    const Submit = async() =>{
       /* const postObj = {message:post,userId:localStorage.getItem('userId')}
        await axios.post('http://localhost:5000/api/post',postObj)
        .then((res)=>{
            setNbPosts(+1)
        })
        .catch((e)=>console.log(e))
    }
    useEffect(()=>{
        axios({
            method:'get',
            url:`${import.meta.env.VITE_APP_URL_CLIENT}api/post`,
            withCredentials:true,
            })
            .then((res:any)=>{console.log(res)
                setListPost(res.data) 
             })
        .catch((e:any)=>console.log(e))
        axios.get('http://localhost:5000/api/post/')
        .then((res)=>{console.log(res)
           setListPost(res.data) 
        })
        .catch((e)=>console.log(e))
    },[nbPosts])   */
}
    return (
        <div className='home'>
            <nbPostsContext.Provider value={{nbPosts,setNbPosts}}>
            <h1>coucou</h1>
            <label htmlFor="post">message:</label>
            <input onChange={(e)=>setPost(e.target.value)} type="text" name="post" id="post" />
            <button onClick={sendPost} type="submit">Envoyer</button>
            
            <ul className='posts'>
                {
                    listPost.map((post)=><Post post={post} key={post._id}/>)
                }
            </ul>
            </nbPostsContext.Provider>
        </div>
    );
};

export default Home;