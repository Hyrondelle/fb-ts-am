import { useState } from 'react';
import { getStorage, ref,uploadBytes } from "firebase/storage";
import { getUser } from '../Store';

const Profil = () => {
  const storage = getStorage();  
  const [photo,setPhoto] = useState<any>();
  const {id}:any = getUser();

  const sendPhoto = (e:any) =>{
    e.preventDefault()
      const imagesRef = ref(storage, 'images/'+id+'/'+photo.name);
      uploadBytes(imagesRef, photo)
      .then((snapshot) => {
      console.log('Uploaded a blob or file!');
      console.log(photo.name);
      console.log(snapshot);
      })
      .catch((e)=>console.log('pb upload'+e)
      );
    }
    
      const handleChange =(e:any) =>{
        setPhoto(e.target.files[0])
      }
    return (
        <div>
          <form onSubmit={sendPhoto}>
            <input onChange={handleChange} type="file" name="photoProfil" id="photoProfil" />
            <button  type="submit">envoyer</button>
            </form>
        </div>
    );
};

export default Profil;