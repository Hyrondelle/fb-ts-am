import { useState } from 'react';
import { getStorage, ref,uploadBytes } from "firebase/storage";

const Profil = () => {
  const storage = getStorage();
  const imagesRef = ref(storage, 'images');
  const [photo,setPhoto] = useState<any>();

  const sendPhoto = () =>{
      uploadBytes(imagesRef, photo)
      .then((snapshot) => {
      console.log('Uploaded a blob or file!');
      console.log(snapshot);
      })
      .catch(()=>console.log('pb upload')
      );
    }
    
      const handleChange =(e:any) =>{
        setPhoto(e.target.files[0])
      }
    return (
        <div>
            <input onChange={handleChange} type="file" name="photoProfil" id="photoProfil" />
            <button onSubmit={sendPhoto} type="submit">envoyer</button>
        </div>
    );
};

export default Profil;