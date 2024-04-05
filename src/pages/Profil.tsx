import { useState } from 'react';
import { getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { getUser } from '../Store';
import Nav from '../components/Nav';

const Profil = () => {
  const storage = getStorage();  
  const [photo,setPhoto] = useState<any>();
  const {id}:any = getUser();
  
  try{
    getDownloadURL(ref(storage, 'images/'+id+'/'+id+'.jpg'))
        .then((url) => {
          const img = document.getElementById('myimg');
          img?.setAttribute('src', url);
        })
        .catch((err) =>console.log(err)
        )
  }
  catch(err){
    console.log(err);
  }

  const sendPhoto = (e:any) =>{
    e.preventDefault()
      const imagesRef = ref(storage, 'images/'+id+'/'+id+'.jpg');
      uploadBytes(imagesRef, photo)
      .then(() => {
      console.log('Uploaded a blob or file!');
      
      })
      .catch((e)=>console.log('pb upload'+e)
      );
    }
      const getPhoto = () => {
        getDownloadURL(ref(storage, 'images/'+id+'/'+id+'.jpg'))
        .then((url) => {
          const img = document.getElementById('myimg');
          img?.setAttribute('src', url);
        })
        .catch((err) =>console.log(err)
        )
      }
      const handleChange =(e:any) =>{
        setPhoto(e.target.files[0])
      }
    return (
        <div className='profil'>
          <Nav/>
          <form onSubmit={sendPhoto}>
            <input onChange={handleChange} type="file" name="photoProfil" id="photoProfil" />
            <button  type="submit">envoyer</button>
            </form>
            <img id='myimg' src='src\assets\defautProfil.png'></img>
            <button onClick={getPhoto}>getphoto</button>
        </div>
    );
};

export default Profil;