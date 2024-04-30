import { useState } from 'react';
import { getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { getUser } from '../Store';
import Nav from '../components/Nav';

const Profil = () => {
  const storage = getStorage();  
  const [photo,setPhoto] = useState<any>();
  const {id}:any = getUser();
  
try{
  getDownloadURL(ref(storage, 'profil/'+id+'/'+id+'.jpg'))
  .then((url) => {
  const img = document.getElementById('imgProfil');
  img?.setAttribute('src', url);
  })
  .catch((err) =>console.log(err))
}
catch(err){
  console.log(err);
}

  const sendPhoto = (e:any) =>{
    e.preventDefault()
      const imagesRef = ref(storage, 'profil/'+id+'/'+id+'.jpg');
      uploadBytes(imagesRef, photo)
      .then(() => {
      console.log('Uploaded a blob or file!');
      
      })
      .catch((e)=>console.log('pb upload'+e)
      );
    }
    
      const getPhoto = () => {
        getDownloadURL(ref(storage, 'profil/'+id+'/'+id+'.jpg'))
        .then((url) => {
          const img = document.getElementById('imgProfil');
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
            <input aria-label='choose profil picture' className='file' onChange={handleChange} type="file" name="photoProfil" id="photoProfil" />
            <button  type="submit">envoyer</button>
            <img id='imgProfil' src='src\assets\defautProfil.png' alt='profil picture'></img>
            <button onClick={getPhoto}>changer la photo</button>
            </form>
            
        </div>
    );
};

export default Profil;