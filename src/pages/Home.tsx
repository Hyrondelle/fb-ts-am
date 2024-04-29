import { useEffect, useState} from 'react';
import Post from '../components/Post';
import { getDocs, collection, doc ,setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { db } from '../firebase.config';
import Nav from '../components/Nav';
import { getUser } from '../Store';

const Home = () => {
    const [post,setPost] = useState<string>('');
    const [listPost,setListPost] = useState<Array<any>>([]);
    const [photo,setPhoto] = useState<any>();
    const postCollectionRef = collection(db,"posts");
    const idUser:any = localStorage.getItem('userId');
    const storage = getStorage();
    const {id}:any = getUser();
    
    const getPhoto = async(e:any) =>{
        e.preventDefault()
        await getDownloadURL(ref(storage, 'photos/'+id+'/'+id+'.jpg'))
        .then((url) => {
            setPhoto(null)
            const img = document.getElementById('photo');
            img?.setAttribute('src', url);
        })
        .catch((err) =>console.log(err))
    }

    const sendPost = async (e:any) => {
        e.preventDefault();
        if(post.length<3){
            console.log('3 lettres minimum'); 
        }
        else{
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
    }
    useEffect(()=>{
        const getPostList = async () => {
            const data = await getDocs(postCollectionRef);
            setListPost(data.docs);
            
        }
        getPostList();
    },[listPost, postCollectionRef])

    const handleChange =(event:any) =>{
        if (event.target.files && event.target.files[0]) {
            setPhoto(URL.createObjectURL(event.target.files[0]));
          }
        
      }
    
    return (
        <div className='home'>
            <Nav/>
            <form className='newMessage' onSubmit={sendPost}>
                <label className='form-lab' htmlFor="post">nouveau message:
                <div className='photo-message'>
                    {photo?<img alt='photo' id='photo' src={photo}></img>:<></>}

                    <textarea className='form-text'
                        autoFocus onChange={(e)=>setPost(e.target.value)}  
                        name="post" 
                        id="post" 
                        value={post[0]}/>
                </div>
                </label>
                <div className='photo-envoi'>
                    <label htmlFor="addPhoto">
                    <div className='form-btn file'>photo</div>
                    <input onChange={handleChange} type="file" 
                        aria-label='choose picture'
                        name="addPhoto" id="addPhoto" />
                    </label>
                    <button className='form-btn' type="submit">Envoyer</button>
                </div>
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