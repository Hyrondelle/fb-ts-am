import React, { useEffect, useState,createContext,Dispatch } from 'react';
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

    const sendPost = async (e:any) => {
        e.preventDefault();
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
            //console.log(data);
           
            
        }
        getPostList();
    },[listPost])
    
    return (
        <div className='home'>
            <nbPostsContext.Provider value={{nbPosts,setNbPosts}}>
            <h1>home</h1>
            <form onSubmit={sendPost}>
                <label htmlFor="post">message:</label>
                <input onChange={(e)=>setPost(e.target.value)} 
                       type="text" 
                       name="post" 
                       id="post" 
                       value={post}/>
                <button type="submit">Envoyer</button>
            </form>
            <ul className='posts'>
                {
                    listPost.map((post)=><Post post={post.data()} key={post.id}/>)
                }
            </ul>
            </nbPostsContext.Provider>
        </div>
    );
};

export default Home;