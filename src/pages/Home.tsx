import { useEffect, useState} from 'react';
import Post from '../components/Post';
import Friends from '../components/Friends';
import { getDocs, collection, doc ,setDoc } from 'firebase/firestore';
import { getStorage, ref,uploadBytes } from "firebase/storage";
import { db } from '../firebase.config';
import Nav from '../components/Nav';
import { getUser } from '../Store';
import OtherPeople from '../components/OtherPeople';

const Home = () => {
    const [post,setPost] = useState<string>('');
    const [listPost,setListPost] = useState<Array<any>>([]);
    const [photo,setPhoto] = useState<any>();
    const [photoSend,setPhotoSend] = useState<any>();
    const postCollectionRef = collection(db,"posts");
    const idUser:any = localStorage.getItem('userId');
    const storage = getStorage();
    const {id,pseudo}:any = getUser();
    
    const sendPost = (e:React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        if(post.length<3){
            console.log('3 lettres minimum'); 
        }
        else if(photoSend){
            const imagesRef = ref(storage, 'photos/'+idUser+post[0]+post[1]+'/'+idUser+post[0]+post[1]+'.jpg');
            uploadBytes(imagesRef, photoSend)
            .then(() => {
                console.log('Uploaded a blob or file!');
            })
            .catch((e)=>console.log('pb upload'+e));

            setDoc(doc(postCollectionRef,id+post[0]+post[1]),{message:post,
                id:id+post[0]+post[1],
                likes:0,
                idLikes:[],
                nbComments:0,
                comments:[],
                date:new Date,
                author:{pseudo:pseudo, id: id},
                photo:true
            })
            .then(()=>{  
                console.log("post envoyé"); 
                setPost('');
                setPhoto(null)
            })
            .catch((err:string)=>{
                console.log(err);
            })
        }
        else{
            setDoc(doc(postCollectionRef,id+post[0]+post[1]),{message:post,
                id:id+post[0]+post[1],
                likes:0,
                idLikes:[],
                nbComments:0,
                comments:[],
                date:new Date,
                author:{pseudo:pseudo, id: id},
                photo:false
            })
            .then(()=>{  
                console.log("post envoyé"); 
                setPost('');
            })
            .catch((err:string)=>{
                console.log(err);
            })
        }
        
    }
        

    useEffect(()=>{
        
            getDocs(postCollectionRef)
            .then((data)=>{
                setListPost(data.docs);
            })
            
        
    },[listPost, postCollectionRef])

    const handleChange =(event:React.ChangeEvent<HTMLInputElement>) =>{
        if (event.target.files && event.target.files[0]) {
            setPhoto(URL.createObjectURL(event.target.files[0]));
            setPhotoSend(event.target.files[0]);
          }
      }
    
    return (
        <div className='home'>
            <Nav/>
            <div className="contentx3">
                <Friends/>
                <div className="posts-middle">
                    <form className='newMessage' onSubmit={sendPost}>
                        <label className='form-lab' htmlFor="post">nouveau message:
                        <div className='photo-message'>
                            {photo?<img alt='photo' id='photo' src={photo}></img>:<></>}

                            <textarea className='form-text'
                            autoFocus onChange={(e)=>setPost(e.target.value)}  
                            name="post" 
                            id="post" 
                            value={post}/>
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
                <OtherPeople/>
            </div>
        </div>
    );
};

export default Home;